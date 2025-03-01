
import { AntibioticDosing } from '../antibioticRecommendations/types';

export const tetracyclineDosing: Record<string, AntibioticDosing> = {
  "doxycycline": {
    condition: "Various Infections",
    adult: {
      standard: {
        dose: "100mg",
        frequency: "daily",
        duration: "Variable, depending on indication"
      },
      severe: {
        dose: "200mg",
        frequency: "daily (divided into 2 doses)",
        duration: "Variable, depending on indication"
      }
    },
    pediatric: {
      standard: {
        doseCalculation: "Not recommended under 12 years",
        maxDose: "100mg",
        frequency: "daily",
        duration: "Variable, depending on indication"
      }
    },
    renalAdjustment: [],
    comments: [
      "First day: 200mg (2 doses of 100mg)",
      "Following days: 100mg daily for most infections",
      "For severe infections: 200mg daily",
      "Contraindicated in pregnancy, nursing mothers, and children under 12 years"
    ]
  },
  "tigecycline": {
    condition: "Complicated skin infections and intra-abdominal infections",
    adult: {
      standard: {
        dose: "Initial 100mg, then 50mg",
        frequency: "every 12 hours",
        duration: "5-14 days"
      }
    },
    pediatric: {
      standard: {
        doseCalculation: "Not recommended under 18 years",
        maxDose: "Not applicable",
        frequency: "Not applicable",
        duration: "Not applicable"
      }
    },
    renalAdjustment: [],
    comments: [
      "Only used when other alternative drugs are not applicable",
      "Intravenous infusion only",
      "Only for adults over 18 years"
    ]
  }
};
