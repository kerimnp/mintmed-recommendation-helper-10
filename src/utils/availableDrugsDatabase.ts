
// Re-export everything from the modular database structure
export * from './availableDrugsDatabase/index';

// Add the missing getAvailableProducts export
export { getAvailableProducts } from './availableDrugsDatabase/index';
