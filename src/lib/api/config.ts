// API Base URL — set NEXT_PUBLIC_API_BASE_URL in .env.local
// Note: Vite used VITE_API_BASE_URL, Next.js requires NEXT_PUBLIC_ prefix
export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL as string || '').replace(/\/+$/, '');
