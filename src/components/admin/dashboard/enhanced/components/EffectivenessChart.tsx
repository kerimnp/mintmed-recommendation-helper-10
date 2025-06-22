
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { TrendingUp } from 'lucide-react';

interface EffectivenessData {
  name: string;
  effectiveness: number;
  cost: number;
}

interface EffectivenessChartProps {
  data: EffectivenessData[];
  title?: string;
}

export const EffectivenessChart: React.FC<EffectivenessChartProps> = ({ 
  data, 
  title = "Effectiveness Trends" 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: 20, right: 20, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80}
                fontSize={12}
              />
              <YAxis 
                label={{ value: 'Effectiveness %', angle: -90, position: 'insideLeft' }}
                domain={[0, 100]}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-gray-800 border rounded-md shadow-md p-3">
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-green-600">
                          Effectiveness: {payload[0].value}%
                        </p>
                        {payload[1] && (
                          <p className="text-sm text-blue-600">
                            Cost: ${payload[1].value}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine y={80} stroke="#22c55e" strokeDasharray="5 5" label="High Effectiveness Threshold" />
              <Line 
                type="monotone" 
                dataKey="effectiveness" 
                stroke="#22c55e" 
                strokeWidth={3}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                name="Effectiveness %"
              />
              <Line 
                type="monotone" 
                dataKey="cost" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                name="Cost $"
                yAxisId="right"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
