
export class PatientDataProcessor {
  static async processQRBarcode(data: string): Promise<any> {
    try {
      console.log('Processing QR/Barcode data:', data);
      
      // Handle different QR/Barcode formats
      let patientData: any = {};
      
      // Format 1: Pipe-separated key-value pairs
      if (data.includes('|') && data.includes(':')) {
        const pairs = data.split('|');
        pairs.forEach(pair => {
          const [key, value] = pair.split(':');
          if (key && value) {
            patientData[key.trim().toLowerCase()] = value.trim();
          }
        });
        
        // Map common field names
        patientData = this.normalizeFieldNames(patientData);
      }
      
      // Format 2: JSON string
      else if (data.startsWith('{') && data.endsWith('}')) {
        try {
          const parsed = JSON.parse(data);
          patientData = this.normalizeFieldNames(parsed);
        } catch (e) {
          throw new Error('Invalid JSON format in QR code');
        }
      }
      
      // Format 3: Simple health card number
      else if (/^\d{10,}$/.test(data.replace(/[-\s]/g, ''))) {
        patientData = {
          healthCardNumber: data,
          // Could trigger a lookup in a healthcare database
        };
      }
      
      // Format 4: Simulate office scanner data
      else if (data.includes('HC:')) {
        // Parse simulated office scanner format
        const parts = data.split('|');
        parts.forEach(part => {
          if (part.startsWith('HC:')) {
            patientData.healthCardNumber = part.substring(3);
          } else if (part.startsWith('NAME:')) {
            const fullName = part.substring(5);
            const nameParts = fullName.split(' ');
            patientData.firstName = nameParts[0];
            patientData.lastName = nameParts.slice(1).join(' ');
          } else if (part.startsWith('DOB:')) {
            patientData.dateOfBirth = part.substring(4);
          } else if (part.startsWith('GENDER:')) {
            const gender = part.substring(7);
            patientData.gender = gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : gender;
          }
        });
      }
      
      else {
        throw new Error('Unrecognized QR/Barcode format');
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
      
      // Extract common patterns from health cards
      for (const line of lines) {
        // Name extraction
        if (this.isLikelyName(line) && !patientData.firstName) {
          const nameParts = line.split(/\s+/);
          if (nameParts.length >= 2) {
            patientData.firstName = nameParts[0];
            patientData.lastName = nameParts.slice(1).join(' ');
          }
        }
        
        // Date of birth
        const dobMatch = line.match(/(?:date of birth|dob|born):\s*(.+)/i) ||
                        line.match(/(\d{1,2}[-\/]\d{1,2}[-\/]\d{4}|\d{4}[-\/]\d{1,2}[-\/]\d{1,2})/);
        if (dobMatch && !patientData.dateOfBirth) {
          patientData.dateOfBirth = this.standardizeDateFormat(dobMatch[1]);
        }
        
        // Health card number
        const hcMatch = line.match(/(?:health card|card number|hc):\s*([0-9-\s]+)/i) ||
                       line.match(/(\d{4}[-\s]?\d{3}[-\s]?\d{3}[-\s]?[A-Z]{2})/);
        if (hcMatch && !patientData.healthCardNumber) {
          patientData.healthCardNumber = hcMatch[1].trim();
        }
        
        // Gender
        const genderMatch = line.match(/(?:gender|sex):\s*(male|female|m|f)/i);
        if (genderMatch && !patientData.gender) {
          const g = genderMatch[1].toLowerCase();
          patientData.gender = g === 'm' || g === 'male' ? 'Male' : 'Female';
        }
        
        // Address
        if (this.isLikelyAddress(line) && !patientData.address) {
          patientData.address = line;
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

  private static normalizeFieldNames(data: any): any {
    const normalized: any = {};
    const fieldMappings: { [key: string]: string } = {
      'name': 'firstName',
      'firstname': 'firstName',
      'first_name': 'firstName',
      'lastname': 'lastName',
      'last_name': 'lastName',
      'surname': 'lastName',
      'dob': 'dateOfBirth',
      'date_of_birth': 'dateOfBirth',
      'birthdate': 'dateOfBirth',
      'hc': 'healthCardNumber',
      'health_card': 'healthCardNumber',
      'card_number': 'healthCardNumber',
      'patient_id': 'healthCardNumber',
      'gender': 'gender',
      'sex': 'gender',
      'address': 'address',
      'addr': 'address'
    };

    for (const [key, value] of Object.entries(data)) {
      const normalizedKey = fieldMappings[key.toLowerCase()] || key;
      normalized[normalizedKey] = value;
    }

    return normalized;
  }

  private static isLikelyName(text: string): boolean {
    // Simple heuristic to identify names
    const words = text.split(/\s+/);
    return words.length >= 2 && 
           words.length <= 4 && 
           words.every(word => /^[A-Za-z]+$/.test(word)) &&
           !text.toLowerCase().includes('health') &&
           !text.toLowerCase().includes('card') &&
           !text.toLowerCase().includes('province');
  }

  private static isLikelyAddress(text: string): boolean {
    // Simple heuristic to identify addresses
    return text.includes('Street') || 
           text.includes('Ave') || 
           text.includes('Road') || 
           text.includes('Blvd') ||
           /\d+/.test(text) && text.length > 10;
  }

  private static standardizeDateFormat(dateStr: string): string {
    // Convert various date formats to YYYY-MM-DD
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return dateStr; // Return original if can't parse
      }
      return date.toISOString().split('T')[0];
    } catch {
      return dateStr;
    }
  }
}
