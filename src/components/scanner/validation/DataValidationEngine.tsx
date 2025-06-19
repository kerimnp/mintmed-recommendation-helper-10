
export class DataValidationEngine {
  static async validatePatientData(data: any): Promise<{
    isValid: boolean;
    hasWarnings: boolean;
    errors: string[];
    warnings: string[];
    qualityScore: number;
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];
    let qualityScore = 100;

    try {
      console.log('Validating patient data:', data);

      // Required field validation
      const requiredFields = ['firstName', 'lastName', 'healthCardNumber'];
      requiredFields.forEach(field => {
        if (!data[field] || !data[field].toString().trim()) {
          errors.push(`Missing required field: ${field}`);
          qualityScore -= 20;
        }
      });

      // JMBG validation for Bosnia/Herzegovina health cards
      if (data.healthCardNumber) {
        const jmbg = data.healthCardNumber.toString().trim();
        if (jmbg.length === 13) {
          if (!this.validateJMBG(jmbg)) {
            errors.push('Invalid JMBG format or checksum');
            qualityScore -= 15;
          }
        } else if (jmbg.length < 10) {
          warnings.push('Health card number appears to be too short');
          qualityScore -= 5;
        }
      }

      // Date of birth validation
      if (data.dateOfBirth) {
        if (!this.validateDateOfBirth(data.dateOfBirth)) {
          errors.push('Invalid date of birth format');
          qualityScore -= 10;
        } else {
          const age = this.calculateAge(data.dateOfBirth);
          if (age < 0 || age > 120) {
            warnings.push('Unusual age detected, please verify');
            qualityScore -= 5;
          }
        }
      }

      // Name validation
      if (data.firstName && !this.validateName(data.firstName)) {
        warnings.push('First name contains unusual characters');
        qualityScore -= 3;
      }

      if (data.lastName && !this.validateName(data.lastName)) {
        warnings.push('Last name contains unusual characters');
        qualityScore -= 3;
      }

      // Gender validation
      if (data.gender && !['Male', 'Female', 'M', 'F', 'male', 'female'].includes(data.gender)) {
        warnings.push('Gender value not recognized');
        qualityScore -= 2;
      }

      // Cross-field validation
      if (data.healthCardNumber && data.dateOfBirth && data.gender) {
        const crossValidation = this.crossValidateJMBGData(
          data.healthCardNumber,
          data.dateOfBirth,
          data.gender
        );
        if (!crossValidation.isValid) {
          errors.push(crossValidation.error || 'Data inconsistency detected');
          qualityScore -= 10;
        }
      }

      // Data completeness assessment
      const completenessScore = this.assessDataCompleteness(data);
      if (completenessScore < 70) {
        warnings.push('Incomplete patient data - consider manual verification');
        qualityScore = Math.min(qualityScore, completenessScore + 20);
      }

      const result = {
        isValid: errors.length === 0,
        hasWarnings: warnings.length > 0,
        errors,
        warnings,
        qualityScore: Math.max(0, qualityScore)
      };

      console.log('Validation result:', result);
      return result;

    } catch (error) {
      console.error('Data validation error:', error);
      return {
        isValid: false,
        hasWarnings: true,
        errors: ['Validation system error'],
        warnings: ['Please verify data manually'],
        qualityScore: 0
      };
    }
  }

  private static validateJMBG(jmbg: string): boolean {
    if (jmbg.length !== 13 || !/^\d{13}$/.test(jmbg)) {
      return false;
    }

    try {
      // Extract components
      const day = parseInt(jmbg.substring(0, 2));
      const month = parseInt(jmbg.substring(2, 4));
      const year = parseInt(jmbg.substring(4, 7));
      const region = jmbg.substring(7, 10);
      const serial = jmbg.substring(10, 13);

      // Basic range validation
      if (day < 1 || day > 31 || month < 1 || month > 12) {
        return false;
      }

      // Check region codes (Bosnia specific)
      const validRegions = ['17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'];
      if (!validRegions.some(r => region.startsWith(r))) {
        return false;
      }

      // Checksum validation (mod 11 algorithm)
      const weights = [7, 6, 5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
      let sum = 0;
      
      for (let i = 0; i < 12; i++) {
        sum += parseInt(jmbg[i]) * weights[i];
      }
      
      const remainder = sum % 11;
      const checkDigit = remainder < 2 ? remainder : 11 - remainder;
      
      return checkDigit === parseInt(jmbg[12]);

    } catch (error) {
      console.error('JMBG validation error:', error);
      return false;
    }
  }

  private static validateDateOfBirth(dateStr: string): boolean {
    try {
      const date = new Date(dateStr);
      return !isNaN(date.getTime()) && 
             date.getFullYear() > 1900 && 
             date.getFullYear() <= new Date().getFullYear();
    } catch {
      return false;
    }
  }

  private static calculateAge(dateOfBirth: string): number {
    try {
      const birth = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      
      return age;
    } catch {
      return -1;
    }
  }

  private static validateName(name: string): boolean {
    // Allow letters, spaces, hyphens, and common diacritics
    const namePattern = /^[a-zA-ZčćžšđČĆŽŠĐ\s\-']+$/;
    return namePattern.test(name.trim()) && name.trim().length >= 2;
  }

  private static crossValidateJMBGData(jmbg: string, dateOfBirth: string, gender: string): {
    isValid: boolean;
    error?: string;
  } {
    try {
      if (jmbg.length !== 13) {
        return { isValid: true }; // Skip validation for non-JMBG numbers
      }

      // Extract date from JMBG
      const jmbgDay = parseInt(jmbg.substring(0, 2));
      const jmbgMonth = parseInt(jmbg.substring(2, 4));
      const jmbgYear = parseInt(jmbg.substring(4, 7));
      const fullYear = jmbgYear < 900 ? 2000 + jmbgYear : 1900 + jmbgYear;

      // Compare with provided date of birth
      const providedDate = new Date(dateOfBirth);
      if (providedDate.getDate() !== jmbgDay ||
          providedDate.getMonth() + 1 !== jmbgMonth ||
          providedDate.getFullYear() !== fullYear) {
        return {
          isValid: false,
          error: 'Date of birth does not match JMBG'
        };
      }

      // Extract and validate gender from JMBG
      const genderDigit = parseInt(jmbg.substring(10, 13));
      const jmbgGender = genderDigit % 2 === 1 ? 'Male' : 'Female';
      const normalizedGender = gender.toLowerCase() === 'male' || gender.toLowerCase() === 'm' ? 'Male' : 'Female';

      if (jmbgGender !== normalizedGender) {
        return {
          isValid: false,
          error: 'Gender does not match JMBG'
        };
      }

      return { isValid: true };

    } catch (error) {
      console.error('Cross-validation error:', error);
      return { isValid: true }; // Don't fail validation due to system errors
    }
  }

  private static assessDataCompleteness(data: any): number {
    const fields = [
      'firstName', 'lastName', 'dateOfBirth', 'gender', 
      'healthCardNumber', 'address', 'region'
    ];
    
    const weights = [20, 20, 20, 10, 20, 5, 5]; // Total = 100
    let score = 0;

    fields.forEach((field, index) => {
      if (data[field] && data[field].toString().trim()) {
        score += weights[index];
      }
    });

    return score;
  }
}
