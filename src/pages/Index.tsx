import { PatientForm } from "@/components/PatientForm";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  en: {
    title: "Antibioteka",
    subtitle: "Advanced Clinical Decision Support for Antibiotic Recommendations",
    patientDemographics: {
      title: "Patient Demographics",
      subtitle: "Enter the patient's basic information",
      age: "Age",
      gender: "Gender",
      weight: "Weight (kg)",
      height: "Height (cm)",
      pregnancy: "Pregnancy Status",
      genderOptions: {
        male: "Male",
        female: "Female"
      },
      pregnancyOptions: {
        notPregnant: "Not Pregnant",
        pregnant: "Pregnant",
        breastfeeding: "Breastfeeding"
      }
    },
    comorbidities: {
      title: "Comorbidities",
      subtitle: "Select any existing medical conditions",
      kidneyDisease: "Chronic Kidney Disease",
      liverDisease: "Liver Disease",
      diabetes: "Diabetes",
      immunosuppressed: "Immunosuppression"
    },
    renalFunction: {
      title: "Renal Function",
      subtitle: "Enter patient's renal function data",
      creatinine: "Serum Creatinine (mg/dL)"
    }
  },
  bs: {
    title: "Antibioteka",
    subtitle: "Napredna klinička podrška za preporuke antibiotika",
    patientDemographics: {
      title: "Demografski podaci",
      subtitle: "Unesite osnovne informacije o pacijentu",
      age: "Godine",
      gender: "Spol",
      weight: "Težina (kg)",
      height: "Visina (cm)",
      pregnancy: "Status trudnoće",
      genderOptions: {
        male: "Muško",
        female: "Žensko"
      },
      pregnancyOptions: {
        notPregnant: "Nije trudna",
        pregnant: "Trudna",
        breastfeeding: "Doji"
      }
    },
    comorbidities: {
      title: "Komorbiditeti",
      subtitle: "Odaberite postojeća medicinska stanja",
      kidneyDisease: "Hronična bubrežna bolest",
      liverDisease: "Bolest jetre",
      diabetes: "Dijabetes",
      immunosuppressed: "Imunosupresija"
    },
    renalFunction: {
      title: "Bubrežna funkcija",
      subtitle: "Unesite podatke o bubrežnoj funkciji pacijenta",
      creatinine: "Serumski kreatinin (mg/dL)"
    }
  }
};

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-cyan/10 to-medical-deep/5">
      <LanguageToggle />
      <div className="container px-4 py-12">
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <h1 className="text-5xl font-bold text-medical-deep bg-clip-text text-transparent bg-gradient-to-r from-medical-deep to-medical-electric">
            {t.title}
          </h1>
          <p className="text-lg text-medical-deep/60 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
        <PatientForm />
      </div>
    </div>
  );
};

export default Index;