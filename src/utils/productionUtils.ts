/**
 * Production Utilities - Core functionality for production-ready application
 */

// Environment detection
export const isProduction = () => import.meta.env.PROD;
export const isDevelopment = () => import.meta.env.DEV;

// Logger that only works in development
export const devLog = (...args: any[]) => {
  if (isDevelopment()) {
    console.log(...args);
  }
};

// Error tracking for production
export const trackError = (error: Error, context?: string) => {
  if (isProduction()) {
    // In production, you'd send this to an error tracking service
    // For now, we'll just log it silently
    console.error(`[ERROR] ${context || 'Unknown'}:`, error);
  } else {
    console.error(`[DEV ERROR] ${context || 'Unknown'}:`, error);
  }
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  if (isDevelopment()) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`Performance [${name}]: ${end - start}ms`);
  } else {
    fn();
  }
};

// Safe JSON parsing
export const safeJsonParse = <T>(jsonString: string, fallback: T): T => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    trackError(error as Error, 'JSON Parse Error');
    return fallback;
  }
};

// Async error wrapper
export const withErrorHandling = async <T>(
  asyncFn: () => Promise<T>,
  errorMessage?: string
): Promise<T | null> => {
  try {
    return await asyncFn();
  } catch (error) {
    trackError(error as Error, errorMessage);
    return null;
  }
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Medical data validation
export const validateMedicalData = {
  age: (age: number): boolean => age >= 0 && age <= 150,
  weight: (weight: number): boolean => weight > 0 && weight <= 1000,
  height: (height: number): boolean => height > 0 && height <= 300,
  temperature: (temp: number): boolean => temp >= 30 && temp <= 50,
  bloodPressure: (systolic: number, diastolic: number): boolean => 
    systolic >= 50 && systolic <= 300 && diastolic >= 30 && diastolic <= 200,
};