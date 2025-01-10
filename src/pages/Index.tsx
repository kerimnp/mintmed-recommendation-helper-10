import { PatientForm } from "@/components/PatientForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-cyan/10 to-medical-deep/5">
      <div className="container px-4 py-12">
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <h1 className="text-5xl font-bold text-medical-deep bg-clip-text text-transparent bg-gradient-to-r from-medical-deep to-medical-electric">
            Antibioteka
          </h1>
          <p className="text-lg text-medical-deep/60 max-w-2xl mx-auto">
            Advanced Clinical Decision Support for Antibiotic Recommendations
          </p>
        </div>
        <PatientForm />
      </div>
    </div>
  );
};

export default Index;