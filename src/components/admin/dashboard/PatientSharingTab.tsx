import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { PatientSharingRequest } from "@/components/patient/PatientSharingRequest";
import { PatientAuditLogs } from "@/components/admin/PatientAuditLogs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share2, Shield } from "lucide-react";

export function PatientSharingTab() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Please log in to access patient sharing features.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sharing" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sharing" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Data Sharing
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Audit Logs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="sharing">
          <PatientSharingRequest currentUserId={user.id} />
        </TabsContent>
        
        <TabsContent value="audit">
          <PatientAuditLogs showAllPatients={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
}