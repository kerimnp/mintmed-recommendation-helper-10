
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Save } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const doctorProfileSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  specialization: z.string().optional(),
  hospital_affiliation: z.string().optional(),
  license_number: z.string().optional(),
  certification_expiry: z.date().optional(),
});

type DoctorProfileFormData = z.infer<typeof doctorProfileSchema>;

interface DoctorProfileFormProps {
  doctor?: Partial<DoctorProfileFormData & { certification_expiry: string }>;
  onSubmit: (data: DoctorProfileFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const DoctorProfileForm: React.FC<DoctorProfileFormProps> = ({
  doctor,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const form = useForm<DoctorProfileFormData>({
    resolver: zodResolver(doctorProfileSchema),
    defaultValues: {
      first_name: doctor?.first_name || '',
      last_name: doctor?.last_name || '',
      specialization: doctor?.specialization || '',
      hospital_affiliation: doctor?.hospital_affiliation || '',
      license_number: doctor?.license_number || '',
      certification_expiry: doctor?.certification_expiry ? new Date(doctor.certification_expiry) : undefined,
    },
  });

  const specializations = [
    'Internal Medicine',
    'Emergency Medicine',
    'Infectious Disease',
    'Critical Care',
    'Pediatrics',
    'Surgery',
    'Cardiology',
    'Pulmonology',
    'Nephrology',
    'Gastroenterology',
    'Neurology',
    'Oncology',
    'Other'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {specializations.map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hospital_affiliation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital Affiliation</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter hospital name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="license_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter license number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="certification_expiry"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Certification Expiry Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1"
                disabled={isLoading}
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Profile'}
              </Button>
              {onCancel && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
