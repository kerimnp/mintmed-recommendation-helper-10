
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Clock, 
  User, 
  FileText, 
  Search, 
  Download,
  AlertTriangle,
  CheckCircle,
  Eye,
  Filter
} from 'lucide-react';

interface AuditEvent {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resourceType: string;
  resourceId: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  outcome: 'success' | 'failure' | 'warning';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

const mockAuditEvents: AuditEvent[] = [
  {
    id: '1',
    timestamp: '2024-01-15T10:30:00Z',
    userId: 'user-123',
    userName: 'Dr. Sarah Johnson',
    action: 'ANTIBIOTIC_RECOMMENDATION_GENERATED',
    resourceType: 'recommendation',
    resourceId: 'rec-456',
    details: {
      patientId: 'pat-789',
      antibioticRecommended: 'Amoxicillin-Clavulanate',
      infectionSite: 'respiratory',
      severity: 'moderate'
    },
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0...',
    outcome: 'success',
    riskLevel: 'low'
  },
  {
    id: '2',
    timestamp: '2024-01-15T09:15:00Z',
    userId: 'user-456',
    userName: 'Dr. Michael Chen',
    action: 'CLINICAL_OVERRIDE_APPLIED',
    resourceType: 'recommendation',
    resourceId: 'rec-789',
    details: {
      originalRecommendation: 'Cefazolin',
      overrideRecommendation: 'Vancomycin',
      reason: 'Patient MRSA history',
      approvedBy: 'Dr. Emily Rodriguez'
    },
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0...',
    outcome: 'success',
    riskLevel: 'high'
  }
];

export const AuditTrailDashboard: React.FC = () => {
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(mockAuditEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOutcome, setFilterOutcome] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);
  const { toast } = useToast();

  const filteredEvents = auditEvents.filter(event => {
    const matchesSearch = searchTerm === '' || 
      event.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.resourceType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesOutcome = filterOutcome === 'all' || event.outcome === filterOutcome;
    const matchesRisk = filterRisk === 'all' || event.riskLevel === filterRisk;
    
    return matchesSearch && matchesOutcome && matchesRisk;
  });

  const handleViewDetails = (event: AuditEvent) => {
    setSelectedEvent(event);
  };

  const handleExportAudit = () => {
    toast({
      title: "Audit Export Started",
      description: "Generating comprehensive audit report...",
    });
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failure': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">Clinical Audit Trail</h2>
          <Badge variant="outline" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            HIPAA Compliant
          </Badge>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportAudit}>
            <Download className="h-4 w-4 mr-2" />
            Export Audit
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Audit Event Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              className="p-2 border rounded"
              value={filterOutcome}
              onChange={(e) => setFilterOutcome(e.target.value)}
            >
              <option value="all">All Outcomes</option>
              <option value="success">Success</option>
              <option value="failure">Failure</option>
              <option value="warning">Warning</option>
            </select>
            
            <select 
              className="p-2 border rounded"
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
            >
              <option value="all">All Risk Levels</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audit Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEvents.map(event => (
              <Card key={event.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getOutcomeIcon(event.outcome)}
                        <h4 className="font-medium">{event.action.replace(/_/g, ' ')}</h4>
                        <Badge className={getRiskBadgeColor(event.riskLevel)} variant="default">
                          {event.riskLevel.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {event.userName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(event.timestamp).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {event.resourceType}
                        </div>
                        <div>IP: {event.ipAddress}</div>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewDetails(event)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedEvent && (
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardHeader>
            <CardTitle>Event Details: {selectedEvent.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold mb-2">Basic Information</h5>
                <div className="space-y-1 text-sm">
                  <div><strong>User:</strong> {selectedEvent.userName}</div>
                  <div><strong>Action:</strong> {selectedEvent.action}</div>
                  <div><strong>Resource:</strong> {selectedEvent.resourceType}</div>
                  <div><strong>Outcome:</strong> {selectedEvent.outcome}</div>
                  <div><strong>Risk Level:</strong> {selectedEvent.riskLevel}</div>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold mb-2">Technical Details</h5>
                <div className="space-y-1 text-sm">
                  <div><strong>Timestamp:</strong> {new Date(selectedEvent.timestamp).toLocaleString()}</div>
                  <div><strong>IP Address:</strong> {selectedEvent.ipAddress}</div>
                  <div><strong>Resource ID:</strong> {selectedEvent.resourceId}</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h5 className="font-semibold mb-2">Event Details</h5>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs overflow-auto">
                {JSON.stringify(selectedEvent.details, null, 2)}
              </pre>
            </div>
            
            <Button 
              className="mt-4" 
              variant="outline" 
              onClick={() => setSelectedEvent(null)}
            >
              Close Details
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
