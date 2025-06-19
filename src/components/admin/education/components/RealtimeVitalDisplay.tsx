
import React from 'react';
import { motion } from 'framer-motion';
import { PhysiologicalState } from '../engines/PhysiologyEngine';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Brain,
  Droplets,
  AlertTriangle
} from 'lucide-react';

interface RealtimeVitalDisplayProps {
  state: PhysiologicalState;
  trends: { [key: string]: 'up' | 'down' | 'stable' };
}

export const RealtimeVitalDisplay: React.FC<RealtimeVitalDisplayProps> = ({
  state,
  trends
}) => {
  const getVitalStatus = (value: number, normal: [number, number], critical: [number, number]) => {
    if (value >= critical[0] && value <= critical[1]) return 'critical';
    if (value >= normal[0] && value <= normal[1]) return 'normal';
    return 'abnormal';
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-red-500';
      case 'down': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-300';
      case 'abnormal': return 'text-orange-600 bg-orange-100 border-orange-300';
      default: return 'text-green-600 bg-green-100 border-green-300';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Heart Rate */}
      <motion.div 
        className={`p-4 border-2 rounded-lg ${getStatusColor(getVitalStatus(state.cardiovascular.heartRate, [60, 100], [40, 150]))}`}
        data-vital="heartRate"
        animate={{ 
          scale: state.cardiovascular.heartRate > 120 ? [1, 1.05, 1] : 1,
          borderColor: state.cardiovascular.heartRate > 120 ? ['#ef4444', '#dc2626', '#ef4444'] : undefined
        }}
        transition={{ 
          duration: 60 / Math.max(state.cardiovascular.heartRate, 60),
          repeat: state.cardiovascular.heartRate > 120 ? Infinity : 0
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <Heart className="h-5 w-5" />
          <span className={getTrendColor(trends.heartRate || 'stable')}>
            {trends.heartRate === 'up' ? '↗' : trends.heartRate === 'down' ? '↘' : '→'}
          </span>
        </div>
        <div className="text-2xl font-bold">{Math.round(state.cardiovascular.heartRate)}</div>
        <div className="text-sm opacity-75">HR (bpm)</div>
        {state.cardiovascular.heartRate > 130 && (
          <Badge variant="destructive" className="text-xs mt-1">TACHY</Badge>
        )}
        {state.cardiovascular.heartRate < 50 && (
          <Badge variant="destructive" className="text-xs mt-1">BRADY</Badge>
        )}
      </motion.div>

      {/* Blood Pressure */}
      <motion.div 
        className={`p-4 border-2 rounded-lg ${getStatusColor(getVitalStatus(state.cardiovascular.systolicBP, [90, 140], [60, 180]))}`}
        data-vital="bloodPressure"
        animate={{
          backgroundColor: state.cardiovascular.systolicBP < 80 ? 
            ['rgb(254, 242, 242)', 'rgb(248, 113, 113)', 'rgb(254, 242, 242)'] : 
            undefined
        }}
        transition={{ duration: 2, repeat: state.cardiovascular.systolicBP < 80 ? Infinity : 0 }}
      >
        <div className="flex items-center justify-between mb-2">
          <Activity className="h-5 w-5" />
          <span className={getTrendColor(trends.bloodPressure || 'stable')}>
            {trends.bloodPressure === 'up' ? '↗' : trends.bloodPressure === 'down' ? '↘' : '→'}
          </span>
        </div>
        <div className="text-2xl font-bold">
          {Math.round(state.cardiovascular.systolicBP)}/{Math.round(state.cardiovascular.diastolicBP)}
        </div>
        <div className="text-sm opacity-75">BP (mmHg)</div>
        {state.cardiovascular.systolicBP < 90 && (
          <Badge variant="destructive" className="text-xs mt-1">HYPOTENSIVE</Badge>
        )}
      </motion.div>

      {/* Oxygen Saturation */}
      <motion.div 
        className={`p-4 border-2 rounded-lg ${getStatusColor(getVitalStatus(state.respiratory.oxygenSat, [95, 100], [80, 94]))}`}
        data-vital="oxygenSat"
        animate={{
          backgroundColor: state.respiratory.oxygenSat < 90 ? 
            ['rgb(254, 242, 242)', 'rgb(220, 38, 38)', 'rgb(254, 242, 242)'] : 
            undefined,
          boxShadow: state.respiratory.oxygenSat < 85 ? 
            ['0 0 0px #dc2626', '0 0 20px #dc2626', '0 0 0px #dc2626'] : 
            undefined
        }}
        transition={{ duration: 1.5, repeat: state.respiratory.oxygenSat < 90 ? Infinity : 0 }}
      >
        <div className="flex items-center justify-between mb-2">
          <Droplets className="h-5 w-5" />
          <span className={getTrendColor(trends.oxygenSat || 'stable')}>
            {trends.oxygenSat === 'up' ? '↗' : trends.oxygenSat === 'down' ? '↘' : '→'}
          </span>
        </div>
        <div className="text-2xl font-bold">{Math.round(state.respiratory.oxygenSat)}%</div>
        <div className="text-sm opacity-75">SpO2</div>
        {state.respiratory.oxygenSat < 90 && (
          <Badge variant="destructive" className="text-xs mt-1 animate-pulse">
            <AlertTriangle className="h-3 w-3 mr-1" />
            CRITICAL
          </Badge>
        )}
      </motion.div>

      {/* Temperature */}
      <motion.div 
        className={`p-4 border-2 rounded-lg ${getStatusColor(getVitalStatus(state.metabolic.temperature, [36.1, 37.2], [35, 40]))}`}
        data-vital="temperature"
        animate={{
          backgroundColor: state.metabolic.temperature > 39 ? 
            ['rgb(254, 242, 242)', 'rgb(251, 146, 60)', 'rgb(254, 242, 242)'] : 
            undefined
        }}
        transition={{ duration: 3, repeat: state.metabolic.temperature > 39 ? Infinity : 0 }}
      >
        <div className="flex items-center justify-between mb-2">
          <Thermometer className="h-5 w-5" />
          <span className={getTrendColor(trends.temperature || 'stable')}>
            {trends.temperature === 'up' ? '↗' : trends.temperature === 'down' ? '↘' : '→'}
          </span>
        </div>
        <div className="text-2xl font-bold">{state.metabolic.temperature.toFixed(1)}°C</div>
        <div className="text-sm opacity-75">Temp</div>
        {state.metabolic.temperature > 38.5 && (
          <Badge variant="destructive" className="text-xs mt-1">FEVER</Badge>
        )}
      </motion.div>

      {/* Additional Critical Values */}
      <motion.div 
        className={`p-4 border-2 rounded-lg ${getStatusColor(getVitalStatus(state.metabolic.lactate, [0.5, 2.2], [4, 20]))}`}
        data-vital="lactate"
      >
        <div className="flex items-center justify-between mb-2">
          <Brain className="h-5 w-5" />
          <span className={getTrendColor(trends.lactate || 'stable')}>
            {trends.lactate === 'up' ? '↗' : trends.lactate === 'down' ? '↘' : '→'}
          </span>
        </div>
        <div className="text-2xl font-bold">{state.metabolic.lactate.toFixed(1)}</div>
        <div className="text-sm opacity-75">Lactate</div>
        {state.metabolic.lactate > 4 && (
          <Badge variant="destructive" className="text-xs mt-1">HIGH</Badge>
        )}
      </motion.div>

      {/* Consciousness Level */}
      <div className={`p-4 border-2 rounded-lg ${
        state.neurological.consciousness === 'alert' ? 'text-green-600 bg-green-100 border-green-300' :
        state.neurological.consciousness === 'confused' ? 'text-yellow-600 bg-yellow-100 border-yellow-300' :
        'text-red-600 bg-red-100 border-red-300'
      }`} data-vital="consciousness">
        <div className="flex items-center justify-between mb-2">
          <Brain className="h-5 w-5" />
        </div>
        <div className="text-lg font-bold">{state.neurological.consciousness.toUpperCase()}</div>
        <div className="text-sm opacity-75">GCS: {state.neurological.gcs}</div>
      </div>
    </div>
  );
};
