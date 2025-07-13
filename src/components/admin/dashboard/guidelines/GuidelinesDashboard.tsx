
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export const GuidelinesDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">Clinical Guidelines</h2>
        <Badge variant="outline" className="flex items-center gap-1">
          <FileText className="h-3 w-3" />
          Updated
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Guidelines</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Up to Date</p>
                <p className="text-2xl font-bold">142</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Outdated</p>
                <p className="text-2xl font-bold text-red-600">2</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Guideline Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="font-medium">IDSA Sepsis Guidelines 2024</div>
                <div className="text-sm text-gray-600">Updated antimicrobial recommendations</div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-600">New</Badge>
                <button 
                  onClick={() => window.open('https://example.com/guidelines/sepsis', '_blank')}
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  View
                </button>
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/api/guidelines/sepsis/export';
                    link.download = 'sepsis_guidelines.pdf';
                    link.click();
                  }}
                  className="text-green-600 hover:text-green-800 text-sm underline"
                >
                  Export
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="font-medium">CDC Healthcare-Associated Infections</div>
                <div className="text-sm text-gray-600">Prevention strategies update</div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-600">Updated</Badge>
                <button 
                  onClick={() => window.open('https://example.com/guidelines/hai', '_blank')}
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  View
                </button>
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/api/guidelines/hai/export';
                    link.download = 'hai_guidelines.pdf';
                    link.click();
                  }}
                  className="text-green-600 hover:text-green-800 text-sm underline"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
