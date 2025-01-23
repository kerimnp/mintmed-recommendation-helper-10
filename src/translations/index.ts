export const translations = {
  en: {
    title: "Antibiotic Prescription Assistant",
    subtitle: "Evidence-based antibiotic recommendations tailored to your patient's needs",
    buttons: {
      generate: "Generate Antibiotic Recommendation"
    },
    allergies: {
      title: "Antibiotic Allergies",
      subtitle: "Select any known antibiotic allergies",
      penicillin: "Penicillin",
      cephalosporin: "Cephalosporin",
      sulfa: "Sulfa Drugs",
      macrolide: "Macrolides",
      fluoroquinolone: "Fluoroquinolones"
    },
    patientDemographics: {
      title: "Patient Demographics",
      subtitle: "Enter basic patient information",
      age: "Age",
      gender: "Gender",
      weight: "Weight (kg)",
      height: "Height (cm)",
      nationality: "Nationality",
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
      subtitle: "Select any relevant comorbidities",
      kidneyDisease: "Kidney Disease",
      liverDisease: "Liver Disease",
      diabetes: "Diabetes",
      immunosuppressed: "Immunosuppressed"
    },
    infectionDetails: {
      title: "Infection Details",
      subtitle: "Specify infection site and characteristics",
      acquisitionType: "Infection Acquisition Type",
      sites: {
        respiratory: "Respiratory",
        urinary: "Urinary Tract",
        skin: "Skin/Soft Tissue",
        abdominal: "Intra-abdominal",
        cns: "Central Nervous System",
        wound: "Surgical Wound",
        bloodstream: "Bloodstream",
        bone: "Bone/Joint",
        ear: "Ear",
        eye: "Eye",
        dental: "Dental"
      },
      symptoms: "Symptoms",
      duration: "Duration (days)",
      severity: "Severity",
      severityLevels: {
        mild: "Mild",
        moderate: "Moderate",
        severe: "Severe"
      }
    },
    medicationHistory: {
      title: "Medication History",
      subtitle: "Previous antibiotic use and other allergies",
      recentAntibiotics: "Recent Antibiotic Use (last 3 months)",
      otherAllergies: "Other Allergies or Reactions"
    },
    renalFunction: {
      title: "Renal Function",
      subtitle: "Enter creatinine level for dose adjustment",
      creatinine: "Serum Creatinine (mg/dL)"
    }
  },
  bs: {
    // ... Same structure as 'en' but with Bosnian translations
    // For now, we'll use English as fallback
    title: "Asistent za Propisivanje Antibiotika",
    subtitle: "Preporuke zasnovane na dokazima prilagođene potrebama vašeg pacijenta",
    buttons: {
      generate: "Generiši Preporuku Antibiotika"
    },
    allergies: {
      title: "Alergije na Antibiotike",
      subtitle: "Odaberite poznate alergije na antibiotike",
      penicillin: "Penicilin",
      cephalosporin: "Cefalosporin",
      sulfa: "Sulfa Lijekovi",
      macrolide: "Makrolidi",
      fluoroquinolone: "Fluorokinoloni"
    },
    patientDemographics: {
      title: "Demografski Podaci",
      subtitle: "Unesite osnovne podatke o pacijentu",
      age: "Dob",
      gender: "Spol",
      weight: "Težina (kg)",
      height: "Visina (cm)",
      nationality: "Nacionalnost",
      pregnancy: "Status Trudnoće",
      genderOptions: {
        male: "Muško",
        female: "Žensko"
      },
      pregnancyOptions: {
        notPregnant: "Nije Trudna",
        pregnant: "Trudna",
        breastfeeding: "Doji"
      }
    },
    comorbidities: {
      title: "Komorbiditeti",
      subtitle: "Odaberite relevantne komorbiditete",
      kidneyDisease: "Bubrežna Bolest",
      liverDisease: "Bolest Jetre",
      diabetes: "Dijabetes",
      immunosuppressed: "Imunosupresija"
    },
    infectionDetails: {
      title: "Detalji Infekcije",
      subtitle: "Navedite mjesto i karakteristike infekcije",
      acquisitionType: "Tip Stjecanja Infekcije",
      sites: {
        respiratory: "Respiratorna",
        urinary: "Urinarna",
        skin: "Koža/Meko Tkivo",
        abdominal: "Intraabdominalna",
        cns: "Centralni Nervni Sistem",
        wound: "Hirurška Rana",
        bloodstream: "Krvotok",
        bone: "Kost/Zglob",
        ear: "Uho",
        eye: "Oko",
        dental: "Zubna"
      },
      symptoms: "Simptomi",
      duration: "Trajanje (dana)",
      severity: "Težina",
      severityLevels: {
        mild: "Blaga",
        moderate: "Umjerena",
        severe: "Teška"
      }
    },
    medicationHistory: {
      title: "Historija Lijekova",
      subtitle: "Prethodna upotreba antibiotika i druge alergije",
      recentAntibiotics: "Nedavna Upotreba Antibiotika (zadnja 3 mjeseca)",
      otherAllergies: "Druge Alergije ili Reakcije"
    },
    renalFunction: {
      title: "Bubrežna Funkcija",
      subtitle: "Unesite nivo kreatinina za prilagođavanje doze",
      creatinine: "Serumski Kreatinin (mg/dL)"
    }
  }
};