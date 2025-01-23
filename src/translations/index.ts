export const translations = {
  en: {
    title: "Antibiotic Recommendation System",
    subtitle: "Evidence-based prescribing support tool",
    buttons: {
      generate: "Generate Recommendation",
    },
    allergies: {
      title: "Allergies",
      subtitle: "Known drug allergies",
      penicillin: "Penicillin",
      cephalosporin: "Cephalosporin",
      sulfa: "Sulfa",
      macrolide: "Macrolide",
      fluoroquinolone: "Fluoroquinolone"
    },
    medicationHistory: {
      title: "Medication History",
      subtitle: "Recent antibiotic use and allergies",
      recentAntibiotics: "Recent antibiotic use (within 90 days)",
      antibioticAllergies: "Known antibiotic allergies",
      otherAllergies: "Other medication allergies or notes",
      penicillin: "Penicillin",
      cephalosporin: "Cephalosporin",
      sulfa: "Sulfa",
      macrolide: "Macrolide",
      fluoroquinolone: "Fluoroquinolone"
    },
    comorbidities: {
      title: "Comorbidities",
      subtitle: "Existing conditions",
      kidneyDisease: "Kidney Disease",
      liverDisease: "Liver Disease",
      diabetes: "Diabetes",
      immunosuppressed: "Immunosuppressed"
    },
    infectionDetails: {
      title: "Infection Details",
      subtitle: "Infection characteristics",
      acquisitionType: "Acquisition Type",
      symptoms: "Symptoms",
      duration: "Duration (days)",
      severity: "Severity",
      sites: {
        respiratory: "Respiratory",
        urinary: "Urinary",
        skin: "Skin/Soft Tissue",
        abdominal: "Intra-abdominal",
        cns: "CNS",
        ear: "Ear",
        eye: "Eye",
        dental: "Dental",
        bone: "Bone/Joint",
        wound: "Wound",
        bloodstream: "Bloodstream"
      },
      severityLevels: {
        mild: "Mild",
        moderate: "Moderate",
        severe: "Severe"
      }
    },
    renalFunction: {
      title: "Renal Function",
      subtitle: "Creatinine levels",
      creatinine: "Creatinine (mg/dL)"
    },
    patientDemographics: {
      title: "Patient Demographics",
      subtitle: "Basic patient information",
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
        breastfeeding: "Breastfeeding",
        notApplicable: "Not Applicable"
      }
    },
    errors: {
      requiredField: "This field is required",
      invalidAge: "Please enter a valid age (0-120)",
      invalidWeight: "Please enter a valid weight",
      invalidHeight: "Please enter a valid height",
      invalidCreatinine: "Please enter a valid creatinine level",
      atLeastOne: "Please select at least one option"
    },
    bmi: {
      categories: {
        underweight: "Underweight",
        normal: "Normal Weight",
        overweight: "Overweight",
        obeseClass1: "Obese Class I",
        obeseClass2: "Obese Class II",
        obeseClass3: "Obese Class III"
      }
    }
  },
  bs: {
    title: "Sistem za preporuku antibiotika",
    subtitle: "Alat za podršku propisivanju zasnovan na dokazima",
    buttons: {
      generate: "Generiši preporuku",
    },
    allergies: {
      title: "Alergije",
      subtitle: "Poznate alergije na lijekove",
      penicillin: "Penicilin",
      cephalosporin: "Cefalosporin",
      sulfa: "Sulfa",
      macrolide: "Makrolid",
      fluoroquinolone: "Fluorokinolon"
    },
    medicationHistory: {
      title: "Historija lijekova",
      subtitle: "Nedavna upotreba antibiotika i alergije",
      recentAntibiotics: "Nedavna upotreba antibiotika (unutar 90 dana)",
      antibioticAllergies: "Poznate alergije na antibiotike",
      otherAllergies: "Druge alergije na lijekove ili napomene",
      penicillin: "Penicilin",
      cephalosporin: "Cefalosporin",
      sulfa: "Sulfa",
      macrolide: "Makrolid",
      fluoroquinolone: "Fluorokinolon"
    },
    comorbidities: {
      title: "Komorbiditeti",
      subtitle: "Postojeća stanja",
      kidneyDisease: "Bubrežna bolest",
      liverDisease: "Bolest jetre",
      diabetes: "Dijabetes",
      immunosuppressed: "Imunosupresija"
    },
    infectionDetails: {
      title: "Detalji infekcije",
      subtitle: "Karakteristike infekcije",
      acquisitionType: "Tip akvizicije",
      symptoms: "Simptomi",
      duration: "Trajanje (dana)",
      severity: "Težina",
      sites: {
        respiratory: "Respiratorni",
        urinary: "Urinarni",
        skin: "Koža/Meko tkivo",
        abdominal: "Intraabdominalni",
        cns: "CNS",
        ear: "Uho",
        eye: "Oko",
        dental: "Zubni",
        bone: "Kost/Zglob",
        wound: "Rana",
        bloodstream: "Krvotok"
      },
      severityLevels: {
        mild: "Blaga",
        moderate: "Umjerena",
        severe: "Teška"
      }
    },
    renalFunction: {
      title: "Bubrežna funkcija",
      subtitle: "Nivoi kreatinina",
      creatinine: "Kreatinin (mg/dL)"
    },
    patientDemographics: {
      title: "Demografski podaci",
      subtitle: "Osnovni podaci o pacijentu",
      age: "Dob",
      gender: "Spol",
      weight: "Težina (kg)",
      height: "Visina (cm)",
      nationality: "Nacionalnost",
      pregnancy: "Status trudnoće",
      genderOptions: {
        male: "Muški",
        female: "Ženski"
      },
      pregnancyOptions: {
        notPregnant: "Nije trudna",
        pregnant: "Trudna",
        breastfeeding: "Doji",
        notApplicable: "Nije primjenjivo"
      }
    },
    errors: {
      requiredField: "Ovo polje je obavezno",
      invalidAge: "Unesite validnu dob (0-120)",
      invalidWeight: "Unesite validnu težinu",
      invalidHeight: "Unesite validnu visinu",
      invalidCreatinine: "Unesite validan nivo kreatinina",
      atLeastOne: "Odaberite barem jednu opciju"
    },
    bmi: {
      categories: {
        underweight: "Pothranjenost",
        normal: "Normalna težina",
        overweight: "Prekomjerna težina",
        obeseClass1: "Gojaznost klase I",
        obeseClass2: "Gojaznost klase II",
        obeseClass3: "Gojaznost klase III"
      }
    }
  }
};