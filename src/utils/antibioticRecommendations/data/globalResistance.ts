
export interface RegionalResistanceData {
  country: string;
  mrsa: number;
  vre: number;
  esbl: number;
  cre: number;
  pseudomonas: number;
}

export interface RegionData {
  region: string;
  countries: RegionalResistanceData[];
}

export const globalResistanceData: RegionData[] = [
  {
    region: "Balkan",
    countries: [
      { 
        country: "Serbia", 
        mrsa: 25.5, 
        vre: 12.3, 
        esbl: 32.1, 
        cre: 8.7, 
        pseudomonas: 24.3 
      },
      { 
        country: "Croatia", 
        mrsa: 21.3, 
        vre: 10.5, 
        esbl: 28.4, 
        cre: 7.2, 
        pseudomonas: 22.1 
      },
      { 
        country: "Bosnia and Herzegovina", 
        mrsa: 32.7, 
        vre: 15.9, 
        esbl: 38.2, 
        cre: 11.5, 
        pseudomonas: 29.4 
      },
      { 
        country: "Slovenia", 
        mrsa: 16.3, 
        vre: 8.7, 
        esbl: 24.6, 
        cre: 6.4, 
        pseudomonas: 18.9 
      },
      { 
        country: "North Macedonia", 
        mrsa: 30.2, 
        vre: 18.4, 
        esbl: 35.7, 
        cre: 14.3, 
        pseudomonas: 27.8 
      },
      { 
        country: "Montenegro", 
        mrsa: 28.9, 
        vre: 16.2, 
        esbl: 33.5, 
        cre: 12.1, 
        pseudomonas: 26.5 
      },
      { 
        country: "Albania", 
        mrsa: 35.4, 
        vre: 19.7, 
        esbl: 42.3, 
        cre: 16.8, 
        pseudomonas: 31.2 
      }
    ]
  },
  {
    region: "Western Europe",
    countries: [
      { 
        country: "France", 
        mrsa: 17.5, 
        vre: 8.3, 
        esbl: 16.4, 
        cre: 5.1, 
        pseudomonas: 15.2 
      },
      { 
        country: "Germany", 
        mrsa: 13.8, 
        vre: 6.4, 
        esbl: 12.3, 
        cre: 3.7, 
        pseudomonas: 12.8 
      },
      { 
        country: "United Kingdom", 
        mrsa: 15.2, 
        vre: 7.5, 
        esbl: 14.1, 
        cre: 4.2, 
        pseudomonas: 13.9 
      },
      { 
        country: "Netherlands", 
        mrsa: 8.3, 
        vre: 3.2, 
        esbl: 7.5, 
        cre: 1.8, 
        pseudomonas: 8.6 
      },
      { 
        country: "Belgium", 
        mrsa: 16.3, 
        vre: 7.8, 
        esbl: 15.2, 
        cre: 4.9, 
        pseudomonas: 14.7 
      },
      { 
        country: "Austria", 
        mrsa: 14.5, 
        vre: 6.9, 
        esbl: 13.2, 
        cre: 4.1, 
        pseudomonas: 13.5 
      },
      { 
        country: "Switzerland", 
        mrsa: 11.2, 
        vre: 5.1, 
        esbl: 10.4, 
        cre: 2.9, 
        pseudomonas: 10.7 
      }
    ]
  },
  {
    region: "Southern Europe",
    countries: [
      { 
        country: "Italy", 
        mrsa: 33.6, 
        vre: 19.3, 
        esbl: 38.5, 
        cre: 17.2, 
        pseudomonas: 31.4 
      },
      { 
        country: "Spain", 
        mrsa: 30.5, 
        vre: 18.7, 
        esbl: 34.2, 
        cre: 16.3, 
        pseudomonas: 29.5 
      },
      { 
        country: "Portugal", 
        mrsa: 31.8, 
        vre: 20.2, 
        esbl: 36.7, 
        cre: 15.8, 
        pseudomonas: 30.1 
      },
      { 
        country: "Greece", 
        mrsa: 40.2, 
        vre: 24.5, 
        esbl: 45.3, 
        cre: 22.7, 
        pseudomonas: 36.9 
      },
      { 
        country: "Malta", 
        mrsa: 28.3, 
        vre: 16.5, 
        esbl: 32.1, 
        cre: 13.4, 
        pseudomonas: 27.2 
      },
      { 
        country: "Cyprus", 
        mrsa: 34.1, 
        vre: 21.6, 
        esbl: 39.4, 
        cre: 18.9, 
        pseudomonas: 32.7 
      }
    ]
  },
  {
    region: "Northern Europe",
    countries: [
      { 
        country: "Sweden", 
        mrsa: 8.5, 
        vre: 3.9, 
        esbl: 7.8, 
        cre: 2.1, 
        pseudomonas: 7.9 
      },
      { 
        country: "Norway", 
        mrsa: 6.7, 
        vre: 2.8, 
        esbl: 5.9, 
        cre: 1.6, 
        pseudomonas: 6.3 
      },
      { 
        country: "Finland", 
        mrsa: 9.8, 
        vre: 4.5, 
        esbl: 9.2, 
        cre: 2.7, 
        pseudomonas: 8.6 
      },
      { 
        country: "Denmark", 
        mrsa: 7.6, 
        vre: 3.4, 
        esbl: 6.8, 
        cre: 1.9, 
        pseudomonas: 7.2 
      },
      { 
        country: "Iceland", 
        mrsa: 5.2, 
        vre: 2.1, 
        esbl: 4.7, 
        cre: 1.2, 
        pseudomonas: 5.5 
      },
      { 
        country: "Estonia", 
        mrsa: 14.3, 
        vre: 7.8, 
        esbl: 15.6, 
        cre: 6.3, 
        pseudomonas: 13.8 
      },
      { 
        country: "Latvia", 
        mrsa: 17.5, 
        vre: 10.2, 
        esbl: 18.9, 
        cre: 7.8, 
        pseudomonas: 16.4 
      },
      { 
        country: "Lithuania", 
        mrsa: 16.8, 
        vre: 9.7, 
        esbl: 17.4, 
        cre: 7.1, 
        pseudomonas: 15.9 
      }
    ]
  },
  {
    region: "Eastern Europe",
    countries: [
      { 
        country: "Poland", 
        mrsa: 22.7, 
        vre: 14.3, 
        esbl: 25.6, 
        cre: 9.8, 
        pseudomonas: 21.5 
      },
      { 
        country: "Czech Republic", 
        mrsa: 18.5, 
        vre: 11.2, 
        esbl: 21.4, 
        cre: 7.9, 
        pseudomonas: 19.2 
      },
      { 
        country: "Slovakia", 
        mrsa: 21.3, 
        vre: 13.7, 
        esbl: 24.2, 
        cre: 9.1, 
        pseudomonas: 20.6 
      },
      { 
        country: "Hungary", 
        mrsa: 24.6, 
        vre: 15.8, 
        esbl: 27.9, 
        cre: 10.7, 
        pseudomonas: 23.4 
      },
      { 
        country: "Romania", 
        mrsa: 33.4, 
        vre: 22.6, 
        esbl: 36.8, 
        cre: 15.3, 
        pseudomonas: 31.9 
      },
      { 
        country: "Bulgaria", 
        mrsa: 32.1, 
        vre: 21.5, 
        esbl: 35.2, 
        cre: 14.8, 
        pseudomonas: 30.5 
      },
      { 
        country: "Moldova", 
        mrsa: 36.7, 
        vre: 24.8, 
        esbl: 39.3, 
        cre: 18.2, 
        pseudomonas: 34.6 
      }
    ]
  }
];
