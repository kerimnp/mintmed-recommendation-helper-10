
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { AlertTriangle } from 'lucide-react';

interface ResistanceData {
  name: string;
  resistance: number;
  effectiveness: number;
}

interface ResistanceChartProps {
  data: ResistanceData[];
  title?: string;
}

export const ResistanceChart: React.FC<ResistanceChartProps> = ({ 
  data, 
  title = "Resistance Patterns" 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: 20, right: 20, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80}
                fontSize={12}
              />
              <YAxis 
                label={{ value: 'Resistance %', angle: -90, position: 'insideLeft' }}
                domain={[0, 100]}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-gray-800 border rounded-md shadow-md p-3">
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-red-600">
                          Resistance: {payload[0].value}%
                        </p>
                        {payload[1] && (
                          <p className="text-sm text-green-600">
                            Effectiveness: {payload[1].value}%
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine y={20} stroke="#ef4444" strokeDasharray="5 5" label="High Resistance Threshold" />
              <Bar dataKey="resistance" fill="#ef4444" name="Resistance %" />
              <Bar dataKey="effectiveness" fill="#22c55e" name="Effectiveness %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
