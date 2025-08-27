// Common API types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  timestamp: string;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
}

// User types
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCreate {
  name: string;
  email: string;
}

export interface UserUpdate {
  name?: string;
  email?: string;
  avatar?: string;
}

// App configuration types
export interface AppConfig {
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  features: {
    darkMode: boolean;
    notifications: boolean;
    analytics: boolean;
  };
}

// Common form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string[]>;
}

// Navigation types
export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
}

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    warning: string;
    success: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  };
}
