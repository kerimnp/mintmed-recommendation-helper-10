import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, BellRing, TrendingUp, Activity, AlertTriangle, CheckCircle, Sun, Cloud, Zap, SmilePlus, Moon, CalendarDays, FilePenLine, Thermometer, User as UserIcon, Pill, FlaskConical, FileText as FileTextIcon, CalendarClock, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import { PatientDetailModal, DetailedPatientInfo, MockPatientSubDetails } from "./PatientDetailModal";


interface MainDashboardTabProps {
  searchTerm?: string;
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return { message: "Good Morning", icon: <Sun className="h-7 w-7 text-yellow-500" /> };
  if (hour < 18) return { message: "Good Afternoon", icon: <Cloud className="h-7 w-7 text-blue-400" /> };
  return { message: "Good Evening", icon: <Moon className="h-7 w-7 text-indigo-400" /> };
};

const generateMockPatientSubDetails = (name: string, baseInfo?: Partial<DetailedPatientInfo>): MockPatientSubDetails => {
  const randomAge = Math.floor(Math.random() * 60) + 20; // Age between 20 and 80
  const genders: Array<'Male' | 'Female' | 'Other'> = ['Male', 'Female'];
  const randomGender = genders[Math.floor(Math.random() * genders.length)];
  
  let primaryConcern = "Routine check-up";
  if (baseInfo?.condition) primaryConcern = `Follow-up for ${baseInfo.condition}`;
  if (baseInfo?.reason) primaryConcern = baseInfo.reason;
  if (baseInfo?.drug) primaryConcern = `Regarding prescription for ${baseInfo.drug}`;

  return {
    age: randomAge,
    gender: randomGender,
    primaryConcern: primaryConcern,
    pastMedicalHistory: ["Hypertension (controlled)", "Seasonal allergies"].slice(0, Math.floor(Math.random() * 3)),
    currentMedications: ["Lisinopril 10mg daily", "Vitamin D3 2000 IU daily"].slice(0, Math.floor(Math.random() * 3)),
    allergies: Math.random() > 0.7 ? ["Penicillin (rash)"] : ["NKA"],
    recentLabResults: [
      { test: "CBC", value: "WNL", notes: "All values within normal limits.", date: "2025-05-10" },
      { test: "BMP", value: "Creatinine 1.0 mg/dL", notes: "eGFR >60", date: "2025-05-10" },
    ].slice(0, Math.floor(Math.random() * 2) + 1),
    treatmentPlan: `Continue current medications. Follow up in 3 months. ${name} was advised to monitor blood pressure daily. If symptoms of ${baseInfo?.condition || 'their condition'} worsen, contact clinic immediately.`
  };
};


export const MainDashboardTab: React.FC<MainDashboardTabProps> = ({ searchTerm }) => {
  const { message: greetingMessage, icon: greetingIcon } = getGreeting();
  const userName = "Dr. Sabic";

  const [selectedPatient, setSelectedPatient] = useState<DetailedPatientInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPatientModal = (patientData: Omit<DetailedPatientInfo, 'mockDetails'>) => {
    const fullDetails: DetailedPatientInfo = {
      ...patientData,
      mockDetails: generateMockPatientSubDetails(patientData.name, patientData)
    };
    setSelectedPatient(fullDetails);
    setIsModalOpen(true);
  };

  const metrics = [
    { title: "Patient Engagement", value: "76%", subtext: "monthly goal", icon: Users, trend: "up", iconColor: "text-medical-primary", specialClass: "bg-medical-primary/10 dark:bg-medical-primary/20" },
    { title: "Active Therapies", value: "54", subtext: "currently ongoing", icon: Activity, trend: "stable", iconColor: "text-green-500" },
    { title: "Urgent Alerts", value: "3", subtext: "require immediate attention", icon: AlertTriangle, trend: "down", iconColor: "text-red-500", pulse: true },
    { title: "Guidelines Adherence", value: "92%", subtext: "past 30 days", icon: CheckCircle, trend: "up", iconColor: "text-purple-500" },
  ];

  const trackedPatients = [
    { id: "P001", name: "John Doe", condition: "Pneumonia", status: "Stable", lastUpdate: "2h ago", risk: "low" },
    { id: "P002", name: "Jane Smith", condition: "UTI", status: "Improving", lastUpdate: "5h ago", risk: "medium" },
    { id: "P003", name: "Robert Johnson", condition: "Cellulitis", status: "Needs Review", lastUpdate: "1d ago", risk: "high" },
  ];

  const criticalAlerts = [
    { id: "A001", message: "High resistance detected for Amoxicillin in Ward A.", severity: "High", patientId: "P00X" },
    { id: "A002", message: "Patient P003 (Robert Johnson) has a potential drug interaction.", severity: "Medium", patientId: "P003" },
    { id: "A003", message: "New severe allergy reported for patient P00Y.", severity: "High", patientId: "P00Y" },
  ];

  const nextPatients = [
    { id: "NP001", name: "Alice Wonderland", time: "14:00", reason: "Follow-up", priority: "medium" },
    { id: "NP002", name: "Bob The Builder", time: "14:30", reason: "New Consultation", priority: "high" },
    { id: "NP003", name: "Charlie Brown", time: "15:00", reason: "Routine Checkup", priority: "low" },
  ];

  const mockPrescriptions = [
    { id: "RX001", patientName: "John Doe", drug: "Amoxicillin 250mg", timestamp: "2 mins ago", status: "Pending" },
    { id: "RX002", patientName: "Jane Smith", drug: "Ciprofloxacin 500mg", timestamp: "10 mins ago", status: "Sent" },
    { id: "RX003", patientName: "Robert Johnson", drug: "Azithromycin 500mg", timestamp: "35 mins ago", status: "Sent" },
  ];

  const heatmapData = [
    { id: "region1", name: "North Sector", resistance: 80, color: "bg-red-600 hover:bg-red-700" },
    { id: "region2", name: "East District", resistance: 45, color: "bg-yellow-500 hover:bg-yellow-600" },
    { id: "region3", name: "West Ward", resistance: 20, color: "bg-green-500 hover:bg-green-600" },
    { id: "region4", name: "South Area", resistance: 65, color: "bg-orange-500 hover:bg-orange-600" },
    { id: "region5", name: "Central Zone", resistance: 30, color: "bg-lime-500 hover:bg-lime-600" },
    { id: "region6", name: "Metro Hub", resistance: 90, color: "bg-red-700 hover:bg-red-800" },
  ];
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="space-y-8 p-1">
      <motion.div 
        className="bg-gradient-to-r from-medical-primary/80 to-medical-accent/80 dark:from-medical-primary/50 dark:to-medical-accent/50 p-6 rounded-xl shadow-lg flex items-center justify-between"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div>
          <h2 className="text-3xl font-bold text-white">
            {greetingMessage}, {userName}!
          </h2>
          <p className="text-white/90 mt-1">Here’s what’s happening with your patients today.</p>
        </div>
        <div className="text-white">
          {React.cloneElement(greetingIcon, { className: "h-12 w-12 opacity-80"})}
        </div>
      </motion.div>

       <motion.div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {metrics.map((metric, index) => (
          <motion.div key={index} variants={cardVariants} whileHover="hover">
            <Card className={`shadow-lg transition-shadow duration-300 ease-in-out ${metric.specialClass || 'bg-card'} ${metric.pulse ? 'animate-pulse-slow' : ''}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {metric.title}
                </CardTitle>
                <metric.icon className={`h-5 w-5 ${metric.iconColor}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-4xl font-bold ${metric.title === "Patient Engagement" ? "text-medical-primary" : "text-gray-800 dark:text-white"}`}>{metric.value}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {metric.subtext}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="grid gap-6 lg:grid-cols-2" initial="hidden" animate="visible" variants={sectionVariants}>
        <motion.div variants={cardVariants} whileHover="hover">
          <Card className="shadow-lg lg:col-span-1 h-full">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 dark:text-white flex items-center">
                <Thermometer className="h-6 w-6 mr-3 text-medical-accent" />
                Geographic Resistance Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent className="py-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Resistance levels across observed regions (simulated data):
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {heatmapData.map((item) => (
                  <motion.div
                    key={item.id}
                    className={`${item.color} p-3 rounded-lg text-white shadow-md transition-all duration-300 ease-in-out`}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <p className="font-semibold text-sm truncate">{item.name}</p>
                    <p className="text-xs opacity-90">Resistance: {item.resistance}%</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                Note: This is a pseudo-heatmap. Full interactive map coming soon.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants} whileHover="hover">
          <Card className="shadow-lg lg:col-span-1 h-full">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 dark:text-white flex items-center">
                <BellRing className="h-6 w-6 mr-3 text-red-500" />
                Critical Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {criticalAlerts.length > 0 ? (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You have <span className="font-bold text-red-500">{criticalAlerts.length} urgent alerts</span>—let’s tackle them!
                  </p>
                  {criticalAlerts.slice(0,3).map(alert => (
                    <div key={alert.id} className={`p-3.5 rounded-lg border-l-4 ${alert.severity === 'High' ? 'border-red-500 bg-red-50 dark:bg-red-900/40' : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/40'}`}>
                      <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{alert.message}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Severity: {alert.severity} {alert.patientId && `(Patient: ${alert.patientId})`}</p>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <SmilePlus className="h-16 w-16 text-green-500 mb-4 opacity-80" />
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">All Clear, Doctor!</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">No critical alerts at the moment. Great job!</p>
                </div>
              )}
              {criticalAlerts.length > 3 && (
                  <button className="text-sm text-medical-primary hover:underline mt-3 font-medium">View all alerts</button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div className="grid gap-6 lg:grid-cols-2" initial="hidden" animate="visible" variants={sectionVariants}>
        <motion.div variants={cardVariants} whileHover="hover">
          <Card className="shadow-lg lg:col-span-1 h-full">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 dark:text-white flex items-center">
                <CalendarDays className="h-6 w-6 mr-3 text-medical-primary" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              {nextPatients.length > 0 ? (
                nextPatients.map(patient => (
                  <motion.div 
                    key={patient.id} 
                    className={`p-3 rounded-lg border ${
                      patient.priority === 'high' ? 'border-red-300 bg-red-50/70 dark:border-red-700 dark:bg-red-900/30' :
                      patient.priority === 'medium' ? 'border-yellow-300 bg-yellow-50/70 dark:border-yellow-700 dark:bg-yellow-900/30' :
                      'border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-gray-800/30'
                    } hover:shadow-md transition-shadow cursor-pointer`}
                    whileHover={{ y: -2 }}
                    onClick={() => handleOpenPatientModal({
                      id: patient.id,
                      name: patient.name,
                      source: 'upcoming',
                      time: patient.time,
                      reason: patient.reason,
                      priority: patient.priority as 'low' | 'medium' | 'high' | undefined,
                    })}
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{patient.name}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        patient.priority === 'high' ? 'bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-200' :
                        patient.priority === 'medium' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200' :
                        'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                      }`}>
                        {patient.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{patient.reason}</p>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <SmilePlus className="h-16 w-16 text-green-500 mb-4 opacity-80" />
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">No Upcoming Appointments</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your schedule is clear for now.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants} whileHover="hover">
          <Card className="shadow-lg lg:col-span-1 h-full">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 dark:text-white flex items-center">
                <FilePenLine className="h-6 w-6 mr-3 text-purple-500" />
                Recent Prescription Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              {mockPrescriptions.length > 0 ? (
                mockPrescriptions.slice(0,3).map(rx => (
                  <motion.div 
                    key={rx.id} 
                    className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 hover:shadow-md transition-shadow cursor-pointer"
                    whileHover={{ y: -2 }}
                    onClick={() => handleOpenPatientModal({
                      id: rx.id,
                      name: rx.patientName,
                      source: 'prescription',
                      drug: rx.drug,
                      status: rx.status,
                      timestamp: rx.timestamp,
                    })}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{rx.patientName}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{rx.drug}</p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        rx.status === 'Pending' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200' :
                        'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200'
                      }`}>
                        {rx.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 text-right">{rx.timestamp}</p>
                  </motion.div>
                ))
              ) : (
                 <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Zap className="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4 opacity-70" />
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">No Recent Prescriptions</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Prescription activity will appear here.</p>
                </div>
              )}
               {mockPrescriptions.length > 3 && (
                <button className="text-sm text-medical-primary hover:underline mt-3 font-medium w-full text-left">View all prescription activity</button>
              )}
               <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                Live updates for prescriptions will be shown here. Full real-time integration is in development.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

       <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 dark:text-white flex items-center">
              <Users className="h-6 w-6 mr-3 text-blue-500" />
              Active Patient Tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {trackedPatients.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-slate-800">
                    <tr>
                      <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Patient ID</th>
                      <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Condition</th>
                      <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Last Update</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-900/70 divide-y divide-gray-200 dark:divide-gray-700">
                    {trackedPatients.map(patient => (
                      <tr 
                        key={patient.id} 
                        className={`hover:bg-gray-100 dark:hover:bg-slate-800/60 transition-colors duration-150 cursor-pointer
                          ${patient.risk === 'high' ? 'bg-red-50/50 dark:bg-red-900/20 hover:bg-red-100/70 dark:hover:bg-red-800/40' : 
                            patient.risk === 'medium' ? 'bg-yellow-50/50 dark:bg-yellow-900/20 hover:bg-yellow-100/70 dark:hover:bg-yellow-800/40' : 
                            'hover:bg-gray-50 dark:hover:bg-slate-800/60'}`}
                        onClick={() => handleOpenPatientModal({
                          id: patient.id,
                          name: patient.name,
                          source: 'active',
                          condition: patient.condition,
                          status: patient.status,
                          lastUpdate: patient.lastUpdate,
                          risk: patient.risk as 'low' | 'medium' | 'high' | undefined,
                        })}
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{patient.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{patient.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{patient.condition}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            patient.status === 'Stable' ? 'bg-green-100 text-green-800 dark:bg-green-700/30 dark:text-green-300' :
                            patient.status === 'Improving' ? 'bg-blue-100 text-blue-800 dark:bg-blue-700/30 dark:text-blue-300' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-700/30 dark:text-yellow-300'
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
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Zap className="h-20 w-20 text-gray-400 dark:text-gray-500 mb-5 opacity-70" />
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Active Patients Yet!</p>
                <p className="text-md text-gray-500 dark:text-gray-400 mt-2 mb-4">
                  Once you start tracking patients, their details will appear here.
                </p>
                <button className="bg-medical-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-medical-primary/90 transition-colors text-sm">
                  Add First Patient
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

       {searchTerm && (
        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Search term active: <span className="font-semibold">{searchTerm}</span>. Results are filtered.
        </p>
      )}

      <PatientDetailModal 
        patient={selectedPatient} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};
