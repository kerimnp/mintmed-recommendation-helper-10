
import Tesseract from 'tesseract.js';

// Real OCR processing using Tesseract.js
export class OCRProcessor {
  static async extractTextFromImage(imageFile: File): Promise<string | null> {
    try {
      console.log('Starting OCR processing for:', imageFile.name);
      
      // Use the correct Tesseract.js API for recognition
      const { data: { text } } = await Tesseract.recognize(
        imageFile,
        'eng+bos+hrv+srp',
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
            }
          }
        }
      );
      
      console.log('OCR completed. Extracted text:', text);
      return text.trim();
    } catch (error) {
      console.error('OCR processing error:', error);
      throw new Error('Failed to extract text from image. Please ensure the image is clear and readable.');
    }
  }

  static async processWithCloudAPI(imageFile: File, apiKey?: string): Promise<string | null> {
    if (!apiKey) {
      console.warn('No API key provided for cloud OCR, falling back to local processing');
      return this.extractTextFromImage(imageFile);
    }

    try {
      const base64Image = await this.fileToBase64(imageFile);
      
      // Google Cloud Vision API implementation
      const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [{
            image: { content: base64Image },
            features: [
              { type: 'TEXT_DETECTION', maxResults: 1 },
              { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 1 }
            ]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Cloud OCR API error: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.responses && result.responses[0] && result.responses[0].fullTextAnnotation) {
        return result.responses[0].fullTextAnnotation.text;
      } else if (result.responses && result.responses[0] && result.responses[0].textAnnotations) {
        return result.responses[0].textAnnotations[0]?.description || null;
      }
      
      throw new Error('No text detected in image');
    } catch (error) {
      console.error('Cloud OCR API error:', error);
      // Fallback to local OCR
      return this.extractTextFromImage(imageFile);
    }
  }

  private static fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  }
}
