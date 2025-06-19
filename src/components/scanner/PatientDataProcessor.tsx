export class PatientDataProcessor {
  static async processQRBarcode(data: string): Promise<any> {
    try {
      console.log('Processing QR/Barcode data:', data);
      
      let patientData: any = {};
      
      // Bosnia Health Card Format (JMBG-based)
      if (this.isBosnianHealthCard(data)) {
        patientData = this.parseBosnianHealthCard(data);
      }
      // Croatian Health Card Format
      else if (this.isCroatianHealthCard(data)) {
        patientData = this.parseCroatianHealthCard(data);
      }
      // Serbian Health Card Format
      else if (this.isSerbianHealthCard(data)) {
        patientData = this.parseSerbianHealthCard(data);
      }
      // European Health Insurance Card (EHIC)
      else if (this.isEHICCard(data)) {
        patientData = this.parseEHICCard(data);
      }
      // Generic pipe-separated format
      else if (data.includes('|') && data.includes(':')) {
        const pairs = data.split('|');
        pairs.forEach(pair => {
          const [key, value] = pair.split(':');
          if (key && value) {
            patientData[key.trim().toLowerCase()] = value.trim();
          }
        });
        patientData = this.normalizeFieldNames(patientData);
      }
      // JSON format
      else if (data.startsWith('{') && data.endsWith('}')) {
        try {
          const parsed = JSON.parse(data);
          patientData = this.normalizeFieldNames(parsed);
        } catch (e) {
          throw new Error('Invalid JSON format in QR code');
        }
      }
      // Simple health card number or JMBG
      else if (/^\d{13}$/.test(data)) {
        // 13-digit number could be JMBG
        patientData = this.parseJMBG(data);
      }
      else if (/^\d{10,}$/.test(data.replace(/[-\s]/g, ''))) {
        patientData = {
          healthCardNumber: data,
        };
      }
      else {
        throw new Error('Unrecognized health card format');
      }
      
      // Validate that we have some useful data
      if (Object.keys(patientData).length === 0) {
        throw new Error('No patient data found in scan');
      }
      
      return patientData;
    } catch (error) {
      console.error('QR/Barcode processing error:', error);
      throw error;
    }
  }

  static async processOCRText(text: string): Promise<any> {
    try {
      console.log('Processing OCR text:', text);
      
      const patientData: any = {};
      const lines = text.split('\n').map(line => line.trim()).filter(line => line);
      
      // Bosnia-specific patterns
      const jmbgMatch = text.match(/(\d{13})/);
      if (jmbgMatch) {
        const jmbgData = this.parseJMBG(jmbgMatch[1]);
        Object.assign(patientData, jmbgData);
      }
      
      // Extract common patterns from health cards
      for (const line of lines) {
        // Name extraction (supports Cyrillic and Latin)
        if (this.isLikelyName(line) && !patientData.firstName) {
          const nameParts = line.split(/\s+/);
          if (nameParts.length >= 2) {
            patientData.firstName = nameParts[0];
            patientData.lastName = nameParts.slice(1).join(' ');
          }
        }
        
        // Date of birth patterns
        const dobMatch = line.match(/(?:datum rođenja|date of birth|rođen|rođena|dob):\s*(.+)/i) ||
                        line.match(/(\d{1,2}[.\/-]\d{1,2}[.\/-]\d{4}|\d{4}[.\/-]\d{1,2}[.\/-]\d{1,2})/);
        if (dobMatch && !patientData.dateOfBirth) {
          patientData.dateOfBirth = this.standardizeDateFormat(dobMatch[1]);
        }
        
        // Health card number patterns
        const hcMatch = line.match(/(?:broj kartice|health card|card number|broj):\s*([0-9-\s]+)/i) ||
                       line.match(/(\d{4}[-\s]?\d{3}[-\s]?\d{3}[-\s]?[A-Z]{2})/);
        if (hcMatch && !patientData.healthCardNumber) {
          patientData.healthCardNumber = hcMatch[1].trim();
        }
        
        // Gender patterns (supports Bosnian, Croatian, Serbian)
        const genderMatch = line.match(/(?:pol|spol|gender|sex):\s*(muški|ženski|muško|žensko|male|female|m|f|ž)/i);
        if (genderMatch && !patientData.gender) {
          const g = genderMatch[1].toLowerCase();
          if (g === 'm' || g === 'male' || g === 'muški' || g === 'muško') {
            patientData.gender = 'Male';
          } else if (g === 'f' || g === 'female' || g === 'ženski' || g === 'žensko' || g === 'ž') {
            patientData.gender = 'Female';
          }
        }
        
        // Address patterns
        if (this.isLikelyAddress(line) && !patientData.address) {
          patientData.address = line;
        }
        
        // Insurance provider patterns
        const insuranceMatch = line.match(/(?:osiguranje|insurance|fond):\s*(.+)/i);
        if (insuranceMatch && !patientData.insuranceProvider) {
          patientData.insuranceProvider = insuranceMatch[1].trim();
        }
      }
      
      // Validate that we extracted something useful
      if (Object.keys(patientData).length === 0) {
        throw new Error('No patient data could be extracted from the text');
      }
      
      return patientData;
    } catch (error) {
      console.error('OCR text processing error:', error);
      throw error;
    }
  }

  private static isBosnianHealthCard(data: string): boolean {
    // Bosnia health cards often contain JMBG and specific formatting
    return /(\d{13})/.test(data) && (
      data.includes('BiH') || 
      data.includes('Bosna') || 
      data.includes('Herzegovina') ||
      data.includes('FOND') ||
      data.toLowerCase().includes('zdravstvo')
    );
  }

  private static parseBosnianHealthCard(data: string): any {
    const result: any = {};
    
    // Extract JMBG
    const jmbgMatch = data.match(/(\d{13})/);
    if (jmbgMatch) {
      const jmbgData = this.parseJMBG(jmbgMatch[1]);
      Object.assign(result, jmbgData);
    }
    
    // Extract name patterns
    const nameMatch = data.match(/ime:\s*([^|]+)/i) || data.match(/name:\s*([^|]+)/i);
    if (nameMatch) {
      const fullName = nameMatch[1].trim();
      const nameParts = fullName.split(/\s+/);
      result.firstName = nameParts[0];
      result.lastName = nameParts.slice(1).join(' ');
    }
    
    return result;
  }

  private static isCroatianHealthCard(data: string): boolean {
    return data.includes('HZZO') || data.includes('Hrvatska') || data.includes('Croatia');
  }

  private static parseCroatianHealthCard(data: string): any {
    // Croatian health card parsing logic
    return this.parseGenericHealthCard(data);
  }

  private static isSerbianHealthCard(data: string): boolean {
    return data.includes('RFZO') || data.includes('Srbija') || data.includes('Serbia');
  }

  private static parseSerbianHealthCard(data: string): any {
    // Serbian health card parsing logic
    return this.parseGenericHealthCard(data);
  }

  private static isEHICCard(data: string): boolean {
    return data.includes('EHIC') || data.includes('European Health');
  }

  private static parseEHICCard(data: string): any {
    // European Health Insurance Card parsing logic
    return this.parseGenericHealthCard(data);
  }

  private static parseGenericHealthCard(data: string): any {
    const result: any = {};
    
    // Extract JMBG if present
    const jmbgMatch = data.match(/(\d{13})/);
    if (jmbgMatch) {
      const jmbgData = this.parseJMBG(jmbgMatch[1]);
      Object.assign(result, jmbgData);
    }
    
    return result;
  }

  private static parseJMBG(jmbg: string): any {
    if (jmbg.length !== 13) {
      return { healthCardNumber: jmbg };
    }
    
    try {
      // JMBG format: DDMMYYYRRRBBC
      const day = parseInt(jmbg.substring(0, 2));
      const month = parseInt(jmbg.substring(2, 4));
      const year = parseInt(jmbg.substring(4, 7));
      const region = jmbg.substring(7, 10);
      const gender = parseInt(jmbg.substring(10, 13));
      
      // Determine full year (7th digit indicates millennium and century)
      const millennium = year < 900 ? 2000 : 1900;
      const fullYear = millennium + year;
      
      // Format date of birth
      const dateOfBirth = `${fullYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      
      // Determine gender (odd = male, even = female)
      const genderStr = gender % 2 === 1 ? 'Male' : 'Female';
      
      // Calculate age
      const today = new Date();
      const birthDate = new Date(fullYear, month - 1, day);
      const age = today.getFullYear() - birthDate.getFullYear() - 
                 (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);
      
      return {
        healthCardNumber: jmbg,
        dateOfBirth: dateOfBirth,
        gender: genderStr,
        age: age.toString(),
        region: this.getRegionFromJMBG(region)
      };
    } catch (error) {
      console.error('Error parsing JMBG:', error);
      return { healthCardNumber: jmbg };
    }
  }

  private static getRegionFromJMBG(regionCode: string): string {
    const regions: { [key: string]: string } = {
      '17': 'Banja Luka',
      '18': 'Bihać',
      '19': 'Doboj',
      '20': 'Jajce',
      '21': 'Livno',
      '22': 'Mostar',
      '23': 'Prijedor',
      '24': 'Sarajevo',
      '25': 'Tuzla',
      '26': 'Zenica',
      '27': 'Travnik',
      '28': 'Trebinje',
      '29': 'Široki Brijeg'
    };
    
    return regions[regionCode] || 'Unknown Region';
  }

  private static normalizeFieldNames(data: any): any {
    const normalized: any = {};
    const fieldMappings: { [key: string]: string } = {
      'name': 'firstName',
      'ime': 'firstName',
      'firstname': 'firstName',
      'first_name': 'firstName',
      'lastname': 'lastName',
      'prezime': 'lastName',
      'last_name': 'lastName',
      'surname': 'lastName',
      'dob': 'dateOfBirth',
      'datum_rođenja': 'dateOfBirth',
      'date_of_birth': 'dateOfBirth',
      'birthdate': 'dateOfBirth',
      'hc': 'healthCardNumber',
      'jmbg': 'healthCardNumber',
      'health_card': 'healthCardNumber',
      'card_number': 'healthCardNumber',
      'patient_id': 'healthCardNumber',
      'gender': 'gender',
      'pol': 'gender',
      'spol': 'gender',
      'sex': 'gender',
      'address': 'address',
      'adresa': 'address',
      'addr': 'address'
    };

    for (const [key, value] of Object.entries(data)) {
      const normalizedKey = fieldMappings[key.toLowerCase()] || key;
      normalized[normalizedKey] = value;
    }

    return normalized;
  }

  private static isLikelyName(text: string): boolean {
    const words = text.split(/\s+/);
    return words.length >= 2 && 
           words.length <= 4 && 
           words.every(word => /^[A-Za-zčćžšđČĆŽŠĐ]+$/.test(word)) &&
           !text.toLowerCase().includes('health') &&
           !text.toLowerCase().includes('card') &&
           !text.toLowerCase().includes('province') &&
           !text.toLowerCase().includes('zdravstvo');
  }

  private static isLikelyAddress(text: string): boolean {
    return text.includes('Street') || 
           text.includes('Ave') || 
           text.includes('Road') || 
           text.includes('Blvd') ||
           text.includes('ulica') ||
           text.includes('broj') ||
           /\d+/.test(text) && text.length > 10;
  }

  private static standardizeDateFormat(dateStr: string): string {
    try {
      // Handle different date separators
      const normalizedDate = dateStr.replace(/[.\/]/g, '-');
      const date = new Date(normalizedDate);
      if (isNaN(date.getTime())) {
        return dateStr;
      }
      return date.toISOString().split('T')[0];
    } catch {
      return dateStr;
    }
  }
}
