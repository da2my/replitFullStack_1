/**
 * API service layer for communicating with FastAPI backend
 * Handles all REST API calls with proper error handling and type safety
 */

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000';

// Types for API requests and responses
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface AITaskRequest {
  task_type: 'text_analysis' | 'sentiment_analysis' | 'image_processing' | 'content_generation';
  input_data: {
    text?: string;
    prompt?: string;
    [key: string]: any;
  };
}

export interface AITask {
  id: string;
  user_id: string;
  task_type: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  input_data: any;
  output_data?: any;
  error_message?: string;
  processing_time?: number;
  created_at: string;
}

export interface BusinessEntity {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  category?: string;
  data: any;
  created_at: string;
  updated_at: string;
}

// API Error Class
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Base API client class
class ApiClient {
  private baseUrl: string;
  
  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = localStorage.getItem('access_token');

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          response.status,
          errorData.detail || `HTTP ${response.status}: ${response.statusText}`,
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new ApiError(0, `Network error: ${errorMessage}`);
    }
  }

  // Authentication endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<{ message: string }> {
    return this.request<{ message: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/api/auth/me');
  }

  // AI Tasks endpoints
  async createAITask(taskData: AITaskRequest): Promise<{ data: AITask }> {
    return this.request<{ data: AITask }>('/api/ai/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async getAITasks(): Promise<AITask[]> {
    return this.request<AITask[]>('/api/ai/tasks');
  }

  async getAITask(taskId: string): Promise<AITask> {
    return this.request<AITask>(`/api/ai/tasks/${taskId}`);
  }

  // Business entities endpoints
  async createBusinessEntity(entityData: {
    name: string;
    description?: string;
    category?: string;
    data: any;
  }): Promise<{ data: BusinessEntity }> {
    return this.request<{ data: BusinessEntity }>('/api/business/entities', {
      method: 'POST',
      body: JSON.stringify(entityData),
    });
  }

  async getBusinessEntities(): Promise<BusinessEntity[]> {
    return this.request<BusinessEntity[]>('/api/business/entities');
  }

  async getBusinessEntity(entityId: string): Promise<BusinessEntity> {
    return this.request<BusinessEntity>(`/api/business/entities/${entityId}`);
  }

  // Utility endpoints
  async getHealth(): Promise<{ status: string; timestamp: string; version: string }> {
    return this.request<{ status: string; timestamp: string; version: string }>('/api/health');
  }

  async validateEmail(email: string): Promise<{ valid: boolean; message: string }> {
    return this.request<{ valid: boolean; message: string }>(`/api/utils/validate-email/${encodeURIComponent(email)}`);
  }

  // User management endpoints
  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/api/users');
  }

  async getUser(userId: string): Promise<User> {
    return this.request<User>(`/api/users/${userId}`);
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    return this.request<User>(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async getUserProfile(userId: string): Promise<any> {
    return this.request<any>(`/api/users/${userId}/profile`);
  }

  async updateUserProfile(userId: string, profileData: any): Promise<any> {
    return this.request<any>(`/api/users/${userId}/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export individual service functions for convenience
export const authService = {
  login: (credentials: LoginRequest) => apiClient.login(credentials),
  register: (userData: RegisterRequest) => apiClient.register(userData),
  getCurrentUser: () => apiClient.getCurrentUser(),
  logout: () => {
    localStorage.removeItem('access_token');
  },
  isAuthenticated: () => !!localStorage.getItem('access_token'),
  getToken: () => localStorage.getItem('access_token'),
  setToken: (token: string) => {
    localStorage.setItem('access_token', token);
  },
};

export const aiService = {
  createTask: (taskData: AITaskRequest) => apiClient.createAITask(taskData),
  getTasks: () => apiClient.getAITasks(),
  getTask: (taskId: string) => apiClient.getAITask(taskId),
};

export const businessService = {
  createEntity: (entityData: {
    name: string;
    description?: string;
    category?: string;
    data: any;
  }) => apiClient.createBusinessEntity(entityData),
  getEntities: () => apiClient.getBusinessEntities(),
  getEntity: (entityId: string) => apiClient.getBusinessEntity(entityId),
};

export const userService = {
  getUsers: () => apiClient.getUsers(),
  getUser: (userId: string) => apiClient.getUser(userId),
  updateUser: (userId: string, userData: Partial<User>) => apiClient.updateUser(userId, userData),
  getProfile: (userId: string) => apiClient.getUserProfile(userId),
  updateProfile: (userId: string, profileData: any) => apiClient.updateUserProfile(userId, profileData),
};

export const utilsService = {
  getHealth: () => apiClient.getHealth(),
  validateEmail: (email: string) => apiClient.validateEmail(email),
};