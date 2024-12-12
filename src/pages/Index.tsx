import { PatientForm } from "@/components/PatientForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-mint-100">
      <div className="container px-4 py-12">
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900">Antibioteka</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Advanced Clinical Decision Support for Antibiotic Recommendations
          </p>
        </div>
        <PatientForm />
      </div>
    </div>
  );
};

export default Index;