import { ApiError } from '@/types';

export function isUnauthorizedError(error: Error | unknown): boolean {
  if (error instanceof ApiError) {
    return error.status === 401;
  }
  return false;
}

export function getStoredToken(): string | null {
  return localStorage.getItem('auth_token');
}

export function setStoredToken(token: string): void {
  localStorage.setItem('auth_token', token);
}

export function removeStoredToken(): void {
  localStorage.removeItem('auth_token');
}

export function redirectToLogin(): void {
  removeStoredToken();
  window.location.href = '/auth';
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}