
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast'; // Updated import path
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

// Define the structure of a prescription based on the Supabase table
export interface Prescription {
  id: string;
  patient_name: string;
  patient_surname: string;
  doctor_name: string;
  doctor_surname: string;
  medication_name: string;
  medication_product_name?: string | null;
  medication_manufacturer?: string | null;
  dose: string;
  route: string;
  duration: string;
  status?: string | null;
  created_at: string;
  user_id?: string | null;
}

interface PrescriptionContextType {
  prescriptions: Prescription[];
  addPrescription: (prescriptionData: Omit<Prescription, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
  isLoading: boolean;
}

const PrescriptionContext = createContext<PrescriptionContextType | undefined>(undefined);

export const PrescriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('prescriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching prescriptions:', error);
        toast({ title: 'Error', description: 'Could not fetch prescriptions.', variant: 'destructive' });
        setPrescriptions([]);
      } else {
        setPrescriptions(data || []);
      }
      setIsLoading(false);
    };

    fetchPrescriptions();

    const channel = supabase
      .channel('public:prescriptions')
      .on<Prescription>(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'prescriptions' },
        (payload: RealtimePostgresChangesPayload<Prescription>) => {
          console.log('Realtime prescription change received!', payload);
          if (payload.eventType === 'INSERT') {
            setPrescriptions(prev => [payload.new as Prescription, ...prev]);
            toast({ title: 'New Prescription Added', description: `Prescription for ${payload.new.patient_name} ${payload.new.patient_surname} added.`});
          } else if (payload.eventType === 'UPDATE') {
            setPrescriptions(prev => prev.map(p => p.id === (payload.new as Prescription).id ? payload.new as Prescription : p));
          } else if (payload.eventType === 'DELETE') {
             // Assuming payload.old has at least {id: string}
            const oldId = (payload.old as { id: string }).id;
            setPrescriptions(prev => prev.filter(p => p.id !== oldId));
          }
        }
      )
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          console.log('Subscribed to prescriptions channel!');
        }
        if (status === 'CHANNEL_ERROR') {
          console.error('Prescription channel error:', err);
          toast({ title: 'Realtime Error', description: 'Connection error for live updates.', variant: 'destructive'});
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const addPrescription = async (prescriptionData: Omit<Prescription, 'id' | 'created_at' | 'user_id'>) => {
    // user_id will be set by default by Supabase based on the logged-in user (due to table default)
    const { data, error } = await supabase
      .from('prescriptions')
      .insert([prescriptionData])
      .select();

    if (error) {
      console.error('Error adding prescription:', error);
      toast({ title: 'Error Adding Prescription', description: error.message, variant: 'destructive' });
      throw error; // re-throw to handle in calling component if needed
    }
    if (data) {
      // Realtime should handle adding to state, but good to confirm
      console.log('Prescription added successfully via insert:', data[0]);
      // toast({ title: 'Prescription Saved', description: 'The prescription has been saved to the database.' });
      // Realtime toast will handle this
    }
  };

  return (
    <PrescriptionContext.Provider value={{ prescriptions, addPrescription, isLoading }}>
      {children}
    </PrescriptionContext.Provider>
  );
};

export const usePrescriptions = () => {
  const context = useContext(PrescriptionContext);
  if (context === undefined) {
    throw new Error('usePrescriptions must be used within a PrescriptionProvider');
  }
  return context;
};
