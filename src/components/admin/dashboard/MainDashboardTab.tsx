
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, BellRing, TrendingUp, Activity, AlertTriangle, CheckCircle } from "lucide-react"; // Added new icons

interface MainDashboardTabProps {
  searchTerm?: string;
}

export const MainDashboardTab: React.FC<MainDashboardTabProps> = ({ searchTerm }) => {
  // Dummy data for metrics - replace with real data/subscriptions
  const metrics = [
    { title: "Total Patients", value: "128", subtext: "patients to date", icon: Users, trend: "up", iconColor: "text-blue-500" },
    { title: "Active Therapies", value: "54", subtext: "currently ongoing", icon: Activity, trend: "stable", iconColor: "text-green-500" },
    { title: "Critical Alerts", value: "3", subtext: "require attention", icon: AlertTriangle, trend: "down", iconColor: "text-red-500" },
    { title: "Guidelines Adherence", value: "92%", subtext: "past 30 days", icon: CheckCircle, trend: "up", iconColor: "text-purple-500" },
  ];

  // Placeholder data for patient tracker and alerts
  const trackedPatients = [
    { id: "P001", name: "John Doe", condition: "Pneumonia", status: "Stable", lastUpdate: "2h ago" },
    { id: "P002", name: "Jane Smith", condition: "UTI", status: "Improving", lastUpdate: "5h ago" },
    { id: "P003", name: "Robert Johnson", condition: "Cellulitis", status: "Needs Review", lastUpdate: "1d ago" },
  ];

  const criticalAlerts = [
    { id: "A001", message: "High resistance detected for Amoxicillin in Ward A.", severity: "High", patientId: "P00X" },
    { id: "A002", message: "Patient P003 (Robert Johnson) has a potential drug interaction.", severity: "Medium", patientId: "P003" },
    { id: "A003", message: "New severe allergy reported for patient P00Y.", severity: "High", patientId: "P00Y" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-medical-primary">{metric.value}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {metric.subtext}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Geographic Resistance Heatmap Section */}
        <Card className="shadow-lg lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl text-medical-primary flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-medical-accent" />
              Geographic Resistance Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="h-16 w-16 text-yellow-500 mb-4" />
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Heatmap Under Development
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              This section will display a visual heatmap of antibiotic resistance patterns.
            </p>
          </CardContent>
        </Card>

        {/* Critical Alerts Section */}
        <Card className="shadow-lg lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl text-medical-primary flex items-center">
              <BellRing className="h-6 w-6 mr-2 text-red-500" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            {criticalAlerts.length > 0 ? criticalAlerts.slice(0,3).map(alert => (
              <div key={alert.id} className={`p-3 rounded-lg border ${alert.severity === 'High' ? 'border-red-500 bg-red-50 dark:bg-red-900/30' : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30'}`}>
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{alert.message}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Severity: {alert.severity} {alert.patientId && `(Patient: ${alert.patientId})`}</p>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center py-8">
                <BellRing className="h-12 w-12 text-green-500 mb-3" />
                <p className="text-md font-semibold text-gray-700 dark:text-gray-300">No Critical Alerts</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">All systems normal.</p>
              </div>
            )}
            {criticalAlerts.length > 3 && (
                <button className="text-sm text-medical-primary hover:underline mt-2">View all alerts</button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Active Patient Tracker Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-medical-primary flex items-center">
            <Users className="h-6 w-6 mr-2 text-blue-500" />
            Active Patient Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {trackedPatients.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Patient ID</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Condition</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Update</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {trackedPatients.map(patient => (
                    <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{patient.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{patient.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{patient.condition}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          patient.status === 'Stable' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                          patient.status === 'Improving' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                        }`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{patient.lastUpdate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Users className="h-16 w-16 text-gray-400 mb-4" />
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">No Active Patients to Track</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Patient tracking data will appear here when available.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {searchTerm && (
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Search term active: <span className="font-semibold">{searchTerm}</span>
        </p>
      )}
    </div>
  );
};

