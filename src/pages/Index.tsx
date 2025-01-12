import { PatientForm } from "@/components/PatientForm";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export const translations = {
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
        breastfeeding: "Breastfeeding",
        notApplicable: "Not Applicable"
      }
    },
    allergies: {
      title: "Allergies",
      subtitle: "Select any known drug allergies",
      penicillin: "Penicillin (includes Amoxicillin, Ampicillin)",
      cephalosporin: "Cephalosporins (e.g., Ceftriaxone, Cefepime)",
      sulfa: "Sulfa Drugs (e.g., TMP-SMX)",
      macrolide: "Macrolides (e.g., Azithromycin, Clarithromycin)",
      fluoroquinolone: "Fluoroquinolones (e.g., Ciprofloxacin, Levofloxacin)"
    },
    renalFunction: {
      title: "Renal Function",
      subtitle: "Enter patient's renal function data",
      creatinine: "Serum Creatinine (mg/dL)"
    },
    comorbidities: {
      title: "Comorbidities",
      subtitle: "Select any existing medical conditions",
      kidneyDisease: "Chronic Kidney Disease",
      liverDisease: "Liver Disease",
      diabetes: "Diabetes",
      immunosuppressed: "Immunosuppression"
    },
    infectionDetails: {
      title: "Infection Details",
      subtitle: "Provide information about the infection",
      site: "Site of Infection",
      symptoms: "Symptoms",
      duration: "Duration of Symptoms (days)",
      severity: "Severity",
      sites: {
        respiratory: "Respiratory",
        urinary: "Urinary",
        skin: "Skin/Soft Tissue",
        abdominal: "Intra-abdominal",
        cns: "Central Nervous System",
        wound: "Wound",
        bloodstream: "Bloodstream (Sepsis)",
        bone: "Bone/Joint",
        ear: "Ear",
        eye: "Eye",
        dental: "Dental",
        other: "Other"
      },
      severityLevels: {
        mild: "Mild",
        moderate: "Moderate",
        severe: "Severe"
      }
    },
    medicationHistory: {
      title: "Medication History",
      subtitle: "Provide information about medications and allergies",
      recentAntibiotics: "Recent Antibiotic Use (within 3 months)",
      otherAllergies: "Other Known Allergies"
    },
    buttons: {
      generate: "Generate Antibiotic Recommendation"
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
        breastfeeding: "Doji",
        notApplicable: "Nije primjenjivo"
      }
    },
    allergies: {
      title: "Alergije",
      subtitle: "Odaberite poznate alergije na lijekove",
      penicillin: "Penicilin (uključujući Amoksicilin, Ampicilin)",
      cephalosporin: "Cefalosporini (npr. Ceftriakson, Cefepim)",
      sulfa: "Sulfa lijekovi (npr. TMP-SMX)",
      macrolide: "Makrolidi (npr. Azitromicin, Klaritromicin)",
      fluoroquinolone: "Fluorokinoloni (npr. Ciprofloksacin, Levofloksacin)"
    },
    renalFunction: {
      title: "Bubrežna funkcija",
      subtitle: "Unesite podatke o bubrežnoj funkciji pacijenta",
      creatinine: "Serumski kreatinin (mg/dL)"
    },
    comorbidities: {
      title: "Komorbiditeti",
      subtitle: "Odaberite postojeća medicinska stanja",
      kidneyDisease: "Hronična bubrežna bolest",
      liverDisease: "Bolest jetre",
      diabetes: "Dijabetes",
      immunosuppressed: "Imunosupresija"
    },
    infectionDetails: {
      title: "Detalji infekcije",
      subtitle: "Unesite informacije o infekciji",
      site: "Mjesto infekcije",
      symptoms: "Simptomi",
      duration: "Trajanje simptoma (dana)",
      severity: "Težina",
      sites: {
        respiratory: "Respiratorni",
        urinary: "Urinarni",
        skin: "Koža/Meko tkivo",
        abdominal: "Intraabdominalni",
        cns: "Centralni nervni sistem",
        wound: "Rana",
        bloodstream: "Krvotok (Sepsa)",
        bone: "Kost/Zglob",
        ear: "Uho",
        eye: "Oko",
        dental: "Zubni",
        other: "Ostalo"
      },
      severityLevels: {
        mild: "Blaga",
        moderate: "Umjerena",
        severe: "Teška"
      }
    },
    medicationHistory: {
      title: "Historija lijekova",
      subtitle: "Unesite informacije o lijekovima i alergijama",
      recentAntibiotics: "Nedavna upotreba antibiotika (unutar 3 mjeseca)",
      otherAllergies: "Druge poznate alergije"
    },
    buttons: {
      generate: "Generiši preporuku antibiotika"
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