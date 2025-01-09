import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function slugify(text: string): string {
  const turkishChars: { [key: string]: string } = {
    'ğ': 'g', 'Ğ': 'G',
    'ü': 'u', 'Ü': 'U',
    'ş': 's', 'Ş': 'S',
    'ı': 'i', 'İ': 'I',
    'ö': 'o', 'Ö': 'O',
    'ç': 'c', 'Ç': 'C'
  }

  return text
    .toLowerCase()
    // Replace Turkish characters
    .replace(/[ğüşıöçĞÜŞİÖÇ]/g, letter => turkishChars[letter] || letter)
    // Replace non-alphanumeric characters with hyphens
    .replace(/[^a-z0-9]+/g, '-')
    // Remove hyphens from start and end
    .replace(/^-+|-+$/g, '')
}
