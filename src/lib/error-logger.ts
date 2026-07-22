export interface ErrorLogPayload {
  type: 'image' | 'api' | 'js' | 'react' | 'server';
  status_code?: number;
  message: string;
  url?: string;
  method?: string;
  file?: string;
  line?: number;
  stack_trace?: string;
  user_id?: number;
  ip?: string;
  browser?: string;
  device?: string;
  os?: string;
  request_body?: any;
  response_body?: any;
}


import { postErrorLog } from "./api/errorLogger";

/**
 * Sends an error log to the backend.
 * Fails silently to prevent infinite error loops.
 */
export async function logErrorToBackend(payload: ErrorLogPayload) {
  try {
    // Collect basic browser details if running on the client
    if (typeof window !== 'undefined') {
      if (!payload.browser) payload.browser = navigator.userAgent;
      if (!payload.url) payload.url = window.location.href;
    }

    postErrorLog(payload).catch((err) => {
      console.error("Error tracker API call failed:", err);
    });
  } catch (e) {
    // Completely silence logging errors
  }
}
