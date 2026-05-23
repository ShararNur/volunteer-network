import axios from 'axios';

const API_TIMEOUT_MS = 90000;
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 3000;

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: API_TIMEOUT_MS,
});

function isRetryableError(error) {
  if (!error.response) return true;
  const status = error.response.status;
  return status >= 502 && status <= 504;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function apiRequest(config) {
  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await apiClient(config);
    } catch (error) {
      lastError = error;
      if (attempt < MAX_RETRIES && isRetryableError(error)) {
        await delay(RETRY_DELAY_MS * (attempt + 1));
        continue;
      }
      throw error;
    }
  }

  throw lastError;
}

export function isServerWakingUp(error) {
  if (!error) return false;
  if (error.code === 'ECONNABORTED') return true;
  if (!error.response) return true;
  const status = error.response.status;
  return status >= 502 && status <= 504;
}

export function getApiErrorMessage(error) {
  if (isServerWakingUp(error)) {
    return 'The server may be starting up after a period of inactivity. Please wait a moment and try again.';
  }
  return (
    error.response?.data?.message ||
    error.message ||
    'Something went wrong. Please try again.'
  );
}
