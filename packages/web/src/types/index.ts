export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'user' | 'admin' | 'moderator';
  created_at: string;
  profile?: {
    bio?: string;
    avatar_url?: string;
  };
}

export interface AuthResponse {
  access_token: string;
  token_type: 'bearer';
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
}

export interface AITask {
  id: number;
  task_type: 'sentiment_analysis' | 'content_generation' | 'text_analysis';
  status: 'processing' | 'completed' | 'failed';
  input_text: string;
  result?: Record<string, any>;
  processing_time?: number;
  created_at: string;
  completed_at?: string;
  user_id: number;
}

export interface CreateAITaskRequest {
  task_type: string;
  input_text: string;
  parameters?: Record<string, any>;
}

export interface BusinessEntity {
  id: number;
  entity_type: string;
  name: string;
  description: string;
  data: Record<string, any>;
  tags: string[];
  created_at: string;
  user_id: number;
}

export interface CreateBusinessEntityRequest {
  entity_type: string;
  name: string;
  description: string;
  data?: Record<string, any>;
  tags?: string[];
}

export interface PaginatedResponse<T> {
  items?: T[];
  tasks?: T[];
  entities?: T[];
  total: number;
  page: number;
  limit: number;
  has_next?: boolean;
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}