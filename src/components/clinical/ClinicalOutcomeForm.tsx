
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
import { Checkbox } from '@/components/ui/checkbox';
import { useCreateClinicalOutcome } from '@/hooks/useClinicalOutcomes';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const clinicalOutcomeSchema = z.object({
  prescriptionId: z.string().uuid(),
  patientId: z.string().uuid(),
  assessmentDate: z.date(),
  clinicalResponse: z.enum(['complete', 'partial', 'no_response', 'worsened']),
  symptomResolution: z.object({
    fever: z.boolean().optional(),
    pain: z.boolean().optional(),
    inflammation: z.boolean().optional(),
    other: z.string().optional(),
  }),
  laboratoryImprovements: z.object({
    wbcCount: z.boolean().optional(),
    cReactiveProtein: z.boolean().optional(),
    procalcitonin: z.boolean().optional(),
    bloodCulture: z.boolean().optional(),
  }),
  cultureClearance: z.boolean().optional(),
  lengthOfStay: z.number().min(0).optional(),
  readmission30Days: z.boolean().default(false),
  adverseDrugReactions: z.array(z.string()).optional(),
  costEffectivenessScore: z.number().min(1).max(10).optional(),
  physicianSatisfactionScore: z.number().min(1).max(10).optional(),
  patientSatisfactionScore: z.number().min(1).max(10).optional(),
  notes: z.string().optional(),
});

type ClinicalOutcomeFormData = z.infer<typeof clinicalOutcomeSchema>;

interface ClinicalOutcomeFormProps {
  prescriptionId: string;
  patientId: string;
  onSuccess?: () => void;
}

export const ClinicalOutcomeForm: React.FC<ClinicalOutcomeFormProps> = ({
  prescriptionId,
  patientId,
  onSuccess
}) => {
  const createOutcome = useCreateClinicalOutcome();

  const form = useForm<ClinicalOutcomeFormData>({
    resolver: zodResolver(clinicalOutcomeSchema),
    defaultValues: {
      prescriptionId,
      patientId,
      assessmentDate: new Date(),
      readmission30Days: false,
      symptomResolution: {},
      laboratoryImprovements: {},
      adverseDrugReactions: [],
    },
  });

  const onSubmit = (data: ClinicalOutcomeFormData) => {
    createOutcome.mutate({
      prescription_id: data.prescriptionId,
      patient_id: data.patientId,
      assessment_date: data.assessmentDate.toISOString().split('T')[0],
      clinical_response: data.clinicalResponse,
      symptom_resolution: data.symptomResolution,
      laboratory_improvements: data.laboratoryImprovements,
      culture_clearance: data.cultureClearance,
      length_of_stay: data.lengthOfStay,
      readmission_30_days: data.readmission30Days,
      adverse_drug_reactions: data.adverseDrugReactions,
      cost_effectiveness_score: data.costEffectivenessScore,
      physician_satisfaction_score: data.physicianSatisfactionScore,
      patient_satisfaction_score: data.patientSatisfactionScore,
      notes: data.notes,
      recorded_by: null, // Will be set by auth context
    }, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Clinical Outcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="assessmentDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Assessment Date</FormLabel>
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
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clinicalResponse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Clinical Response</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select clinical response" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="complete">Complete</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                        <SelectItem value="no_response">No Response</SelectItem>
                        <SelectItem value="worsened">Worsened</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <h4 className="font-medium mb-3">Symptom Resolution</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="symptomResolution.fever"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Fever</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="symptomResolution.pain"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Pain</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="symptomResolution.inflammation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Inflammation</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="lengthOfStay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length of Stay (days)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="physicianSatisfactionScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Physician Satisfaction (1-10)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="patientSatisfactionScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Satisfaction (1-10)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-row items-start space-x-3 space-y-0">
              <FormField
                control={form.control}
                name="readmission30Days"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>30-Day Readmission</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any additional clinical observations..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full"
              disabled={createOutcome.isPending}
            >
              {createOutcome.isPending ? 'Recording...' : 'Record Clinical Outcome'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
