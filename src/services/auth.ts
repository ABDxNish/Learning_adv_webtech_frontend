import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  role: 'client' | 'agency';
}

export interface AuthResponse {
  accessToken: string;
}

export const authService = {
  login: (credentials: LoginCredentials): Promise<{ data: AuthResponse }> => 
    api.post('/auth/login', credentials),
  
  register: (userData: RegisterData): Promise<{ data: AuthResponse }> => 
    api.post('/auth/register', userData),
};