import { read, utils as xlsxUtils } from 'xlsx';
import { ProcessedLead } from '../types';

// Helper to sanitize Brazilian phone numbers
export const sanitizePhoneNumber = (raw: string | number): string => {
  const str = String(raw).replace(/\D/g, '');
  
  // Basic validation for BR numbers
  // If it starts with 55, keep it. If not, add it.
  // BR numbers usually: 10 digits (Landline with DDD) or 11 digits (Mobile with DDD)
  
  if (str.length < 10) return ''; // Invalid too short
  
  let cleaned = str;
  if (str.startsWith('55') && (str.length === 12 || str.length === 13)) {
    // Already has country code
    return cleaned;
  }
  
  // Assuming DDD included if length is 10 or 11
  if (str.length === 10 || str.length === 11) {
    return `55${str}`;
  }
  
  return cleaned; // Return as is if we can't determine, user can manually check invalid status
};

export const generateWhatsAppLink = (phone: string, message: string): string => {
  if (!phone) return '';
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
};

export const parseFile = async (file: File): Promise<any[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = xlsxUtils.sheet_to_json(worksheet, { header: 1 });
        resolve(jsonData as any[][]);
      } catch (err) {
        reject(err);
      }
    };
    
    reader.onerror = (err) => reject(err);
    reader.readAsBinaryString(file);
  });
};

export const extractLeadsFromText = (text: string): { name: string, phone: string }[] => {
  // Simple regex to find things that look like phone numbers
  // Matches (XX) XXXXX-XXXX or similar patterns
  const phoneRegex = /(?:\(?\d{2}\)?\s?)?(?:9\d{4}[-\s]?\d{4}|\d{4}[-\s]?\d{4})/g;
  const found = text.match(phoneRegex);
  
  if (!found) return [];

  // Since we can't easily associate names in raw text block without structure,
  // we will return "Lead N" as name.
  return found.map((phone, idx) => ({
    name: `Lead Importado ${idx + 1}`,
    phone: phone
  }));
};