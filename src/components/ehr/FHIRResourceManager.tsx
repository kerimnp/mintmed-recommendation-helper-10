import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { 
  FileCode, 
  CheckCircle, 
  AlertTriangle, 
  Plus, 
  Edit, 
  Trash2,
  RefreshCw,
  Shield,
  Database
} from 'lucide-react';

interface FHIRTemplate {
  id: string;
  resource_type: string;
  template_name: string;
  version: string;
  template_schema: any;
  validation_rules: any;
  mapping_rules: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface FHIRResource {
  id: string;
  resource_type: string;
  resource_id: string;
  version_id: string;
  data: any;
  patient_id?: string;
  last_updated: string;
  created_at: string;
}

interface FHIRResourceManagerProps {
  user: User;
}

export const FHIRResourceManager: React.FC<FHIRResourceManagerProps> = ({ user }) => {
  const [templates, setTemplates] = useState<FHIRTemplate[]>([]);
  const [resources, setResources] = useState<FHIRResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('templates');

  useEffect(() => {
    fetchTemplates();
    fetchResources();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('fhir_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching FHIR templates:', error);
      toast.error('Failed to load FHIR templates');
    } finally {
      setLoading(false);
    }
  };

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('fhir_resources')
        .select('*')
        .order('last_updated', { ascending: false })
        .limit(50);

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching FHIR resources:', error);
      toast.error('Failed to load FHIR resources');
    }
  };

  const createDefaultTemplates = async () => {
    try {
      const defaultTemplates = [
        {
          resource_type: 'Patient',
          template_name: 'Standard Patient Template',
          version: 'R4',
          template_schema: {
            resourceType: 'Patient',
            id: '',
            identifier: [],
            name: [],
            telecom: [],
            gender: '',
            birthDate: '',
            address: []
          },
          validation_rules: [
            { field: 'name', required: true, type: 'array' },
            { field: 'birthDate', required: true, type: 'date' }
          ],
          mapping_rules: {
            first_name: 'name[0].given[0]',
            last_name: 'name[0].family',
            date_of_birth: 'birthDate',
            gender: 'gender'
          },
          created_by: user.id
        },
        {
          resource_type: 'Encounter',
          template_name: 'Standard Encounter Template',
          version: 'R4',
          template_schema: {
            resourceType: 'Encounter',
            id: '',
            status: 'in-progress',
            class: {},
            subject: {},
            period: {},
            serviceProvider: {}
          },
          validation_rules: [
            { field: 'status', required: true, type: 'code' },
            { field: 'subject', required: true, type: 'reference' }
          ],
          mapping_rules: {
            encounter_date: 'period.start',
            specialty: 'class.code',
            patient_id: 'subject.reference'
          },
          created_by: user.id
        },
        {
          resource_type: 'Medication',
          template_name: 'Standard Medication Template',
          version: 'R4',
          template_schema: {
            resourceType: 'Medication',
            id: '',
            code: {},
            form: {},
            ingredient: []
          },
          validation_rules: [
            { field: 'code', required: true, type: 'CodeableConcept' }
          ],
          mapping_rules: {
            antibiotic_name: 'code.coding[0].display',
            dosage_form: 'form.coding[0].display'
          },
          created_by: user.id
        }
      ];

      const { error } = await supabase
        .from('fhir_templates')
        .insert(defaultTemplates);

      if (error) throw error;

      toast.success('Default FHIR templates created successfully');
      fetchTemplates();
    } catch (error) {
      console.error('Error creating default templates:', error);
      toast.error('Failed to create default templates');
    }
  };

  const validateFHIRResource = (resource: any, template: FHIRTemplate): string[] => {
    const errors: string[] = [];
    
    const rules = Array.isArray(template.validation_rules) ? template.validation_rules : [];
    rules.forEach(rule => {
      const value = getNestedValue(resource, rule.field);
      
      if (rule.required && (!value || (Array.isArray(value) && value.length === 0))) {
        errors.push(`Required field '${rule.field}' is missing`);
      }
      
      if (value && rule.type) {
        switch (rule.type) {
          case 'date':
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
              errors.push(`Field '${rule.field}' must be a valid date (YYYY-MM-DD)`);
            }
            break;
          case 'array':
            if (!Array.isArray(value)) {
              errors.push(`Field '${rule.field}' must be an array`);
            }
            break;
        }
      }
    });
    
    return errors;
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => {
      if (key.includes('[') && key.includes(']')) {
        const [arrayKey, indexStr] = key.split('[');
        const index = parseInt(indexStr.replace(']', ''));
        return current?.[arrayKey]?.[index];
      }
      return current?.[key];
    }, obj);
  };

  const convertToFHIR = async (localData: any, resourceType: string) => {
    try {
      const template = templates.find(t => t.resource_type === resourceType && t.is_active);
      if (!template) {
        throw new Error(`No active template found for resource type: ${resourceType}`);
      }

      const fhirResource = { ...template.template_schema };
      
      // Apply mapping rules
      Object.entries(template.mapping_rules).forEach(([localField, fhirPath]) => {
        if (localData[localField]) {
          setNestedValue(fhirResource, fhirPath as string, localData[localField]);
        }
      });

      // Validate the resource
      const validationErrors = validateFHIRResource(fhirResource, template);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }

      // Store the FHIR resource
      const { error } = await supabase
        .from('fhir_resources')
        .insert({
          resource_type: resourceType,
          resource_id: fhirResource.id || `${resourceType}/${Date.now()}`,
          data: fhirResource,
          patient_id: localData.patient_id
        });

      if (error) throw error;

      toast.success(`${resourceType} converted to FHIR successfully`);
      fetchResources();
    } catch (error) {
      console.error('Error converting to FHIR:', error);
      toast.error(`Failed to convert to FHIR: ${error.message}`);
    }
  };

  const setNestedValue = (obj: any, path: string, value: any) => {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (key.includes('[') && key.includes(']')) {
        const [arrayKey, indexStr] = key.split('[');
        const index = parseInt(indexStr.replace(']', ''));
        
        if (!current[arrayKey]) current[arrayKey] = [];
        if (!current[arrayKey][index]) current[arrayKey][index] = {};
        current = current[arrayKey][index];
      } else {
        if (!current[key]) current[key] = {};
        current = current[key];
      }
    }
    
    const lastKey = keys[keys.length - 1];
    current[lastKey] = value;
  };

  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'Patient': return '👤';
      case 'Encounter': return '🏥';
      case 'Medication': return '💊';
      case 'Observation': return '📊';
      default: return '📄';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="h-5 w-5" />
            FHIR Resource Manager
          </CardTitle>
          <CardDescription>
            Manage FHIR templates and resources for interoperability compliance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">FHIR Templates</h3>
                <Button onClick={createDefaultTemplates} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Default Templates
                </Button>
              </div>

              <div className="grid gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium flex items-center gap-2">
                            <span>{getResourceTypeIcon(template.resource_type)}</span>
                            {template.template_name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {template.resource_type} • Version {template.version}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={template.is_active ? "default" : "secondary"}>
                            {template.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>Validation Rules: {Array.isArray(template.validation_rules) ? template.validation_rules.length : 0}</p>
                        <p>Mapping Rules: {typeof template.mapping_rules === 'object' ? Object.keys(template.mapping_rules || {}).length : 0}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {templates.length === 0 && (
                  <Card className="border-dashed">
                    <CardContent className="p-8 text-center">
                      <FileCode className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">No FHIR Templates</h3>
                      <p className="text-muted-foreground mb-4">
                        Create default templates to start managing FHIR resources
                      </p>
                      <Button onClick={createDefaultTemplates}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Default Templates
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">FHIR Resources</h3>
                <Button onClick={fetchResources} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>

              <div className="grid gap-4">
                {resources.map((resource) => (
                  <Card key={resource.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium flex items-center gap-2">
                            <span>{getResourceTypeIcon(resource.resource_type)}</span>
                            {resource.resource_type} - {resource.resource_id}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Version: {resource.version_id || 'N/A'}
                          </p>
                        </div>
                        <Badge variant="outline">
                          <Database className="h-3 w-3 mr-1" />
                          FHIR R4
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        <p>Last Updated: {new Date(resource.last_updated).toLocaleString()}</p>
                        {resource.patient_id && <p>Patient ID: {resource.patient_id}</p>}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {resources.length === 0 && (
                  <Card className="border-dashed">
                    <CardContent className="p-8 text-center">
                      <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">No FHIR Resources</h3>
                      <p className="text-muted-foreground">
                        FHIR resources will appear here when data is converted from local formats
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};