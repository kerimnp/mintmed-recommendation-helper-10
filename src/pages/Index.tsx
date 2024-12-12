import { PatientForm } from "@/components/PatientForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-white to-mint-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-mint-200/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-mint-300/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container px-4 py-12 relative">
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <div className="inline-block">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-mint-600 to-mint-400 
              filter drop-shadow-lg">
              Antibioteka
            </h1>
            <div className="h-1 w-1/2 mx-auto bg-gradient-to-r from-mint-400 to-mint-300 rounded-full mt-2" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Advanced Clinical Decision Support for Antibiotic Recommendations
          </p>
        </div>
        <PatientForm />
      </div>
    </div>
  );
};

export default Index;