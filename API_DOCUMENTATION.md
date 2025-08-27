# REST API Documentation - Monorepo Project

Comprehensive documentation for the REST API endpoints powered by FastAPI backend, consumed by React web frontend.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                   Client Applications                   │
├─────────────────────────────────────────────────────────┤
│  React Web Frontend (packages/web/)                    │
│  - TanStack Query for state management                 │
│  - Custom API client with error handling               │
│  - JWT token authentication                            │
├─────────────────────────────────────────────────────────┤
│  React Native Mobile (packages/mobile/)                │
│  - Cross-platform API consumption                      │
│  - Same endpoints, platform-optimized UI               │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   REST API Layer                       │
├─────────────────────────────────────────────────────────┤
│  FastAPI Backend (packages/backend/)                   │
│  - JWT authentication with 30-min expiration           │
│  - Role-based access control                           │
│  - Pydantic models for validation                      │
│  - CORS configured for frontend origins                │
├─────────────────────────────────────────────────────────┤
│  Express.js Backend (server/) - Legacy                 │
│  - Session-based authentication                        │
│  - PostgreSQL with Drizzle ORM                         │
│  - In-memory storage fallback                          │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  Data Persistence                      │
├─────────────────────────────────────────────────────────┤
│  PostgreSQL Database                                   │
│  - Users, Profiles, AI Tasks                          │
│  - Business Entities, Audit Logs                      │
│  - Sessions (Express) vs Stateless JWT (FastAPI)      │
└─────────────────────────────────────────────────────────┘
```

## 🔐 Authentication Endpoints

### Register New User
**POST** `/api/auth/register`

Register a new user account with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "full_name": "John Doe"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user",
    "created_at": "2025-01-27T19:00:00Z"
  }
}
```

**Frontend Usage:**
```typescript
// packages/web/src/hooks/useAuth.ts
const { mutate: register } = useMutation({
  mutationFn: (data) => authService.register(data),
  onSuccess: () => navigate('/auth?mode=login')
});
```

### User Login
**POST** `/api/auth/login`

Authenticate user and receive JWT access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user"
  }
}
```

**Frontend Integration:**
```typescript
// Automatic token storage and API client configuration
const { mutate: login } = useMutation({
  mutationFn: authService.login,
  onSuccess: (data) => {
    localStorage.setItem('auth_token', data.access_token);
    queryClient.setQueryData(['auth', 'user'], data.user);
  }
});
```

### Get Current User
**GET** `/api/auth/me`

Retrieve current authenticated user information.

**Headers:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "user",
  "created_at": "2025-01-27T19:00:00Z",
  "profile": {
    "bio": "Software developer",
    "avatar_url": "https://example.com/avatar.jpg"
  }
}
```

**React Hook Usage:**
```typescript
// Automatic authentication check
const { data: user, isLoading } = useQuery({
  queryKey: ['auth', 'user'],
  queryFn: authService.getCurrentUser,
  retry: false
});
```

## 🤖 AI Processing Endpoints

### Create AI Task
**POST** `/api/ai/tasks`

Create a new AI processing task for text analysis, sentiment analysis, or content generation.

**Request Body:**
```json
{
  "task_type": "sentiment_analysis",
  "input_text": "This product is absolutely amazing! I love it.",
  "parameters": {
    "language": "en",
    "confidence_threshold": 0.8
  }
}
```

**Response (201 Created):**
```json
{
  "id": 123,
  "task_type": "sentiment_analysis",
  "status": "processing",
  "input_text": "This product is absolutely amazing! I love it.",
  "result": null,
  "created_at": "2025-01-27T19:00:00Z",
  "user_id": 1
}
```

**Frontend Implementation:**
```typescript
// packages/web/src/hooks/useAITasks.ts
const { mutate: createTask, isPending: isCreating } = useMutation({
  mutationFn: aiService.createTask,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['ai', 'tasks'] });
    toast({ title: "AI task created successfully" });
  }
});
```

### List AI Tasks
**GET** `/api/ai/tasks`

Retrieve all AI tasks for the authenticated user with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (processing, completed, failed)

**Response (200 OK):**
```json
{
  "tasks": [
    {
      "id": 123,
      "task_type": "sentiment_analysis",
      "status": "completed",
      "input_text": "This product is amazing!",
      "result": {
        "sentiment": "positive",
        "confidence": 0.95,
        "score": 4.8
      },
      "created_at": "2025-01-27T19:00:00Z"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10,
  "has_next": true
}
```

**Auto-Updating Frontend:**
```typescript
// Polling every 3 seconds for real-time updates
const { data: tasks } = useQuery({
  queryKey: ['ai', 'tasks'],
  queryFn: () => aiService.getTasks(),
  refetchInterval: 3000,
  refetchIntervalInBackground: true
});
```

### Get Specific AI Task
**GET** `/api/ai/tasks/{task_id}`

Retrieve details of a specific AI task.

**Response (200 OK):**
```json
{
  "id": 123,
  "task_type": "content_generation",
  "status": "completed",
  "input_text": "Write a blog post about renewable energy",
  "result": {
    "generated_content": "Renewable energy is revolutionizing...",
    "word_count": 500,
    "readability_score": 8.2
  },
  "processing_time": 2.3,
  "created_at": "2025-01-27T19:00:00Z",
  "completed_at": "2025-01-27T19:00:02Z"
}
```

## 🏢 Business Entity Endpoints

### Create Business Entity
**POST** `/api/business/entities`

Create a new business entity (company, project, product, etc.).

**Request Body:**
```json
{
  "entity_type": "company",
  "name": "TechStartup Inc.",
  "description": "AI-powered startup focused on automation",
  "data": {
    "founded": "2024",
    "employees": 25,
    "revenue": "$2M ARR",
    "location": "San Francisco, CA"
  },
  "tags": ["startup", "ai", "automation"]
}
```

**Response (201 Created):**
```json
{
  "id": 456,
  "entity_type": "company",
  "name": "TechStartup Inc.",
  "description": "AI-powered startup focused on automation",
  "data": {
    "founded": "2024",
    "employees": 25,
    "revenue": "$2M ARR",
    "location": "San Francisco, CA"
  },
  "tags": ["startup", "ai", "automation"],
  "created_at": "2025-01-27T19:00:00Z",
  "user_id": 1
}
```

### List Business Entities
**GET** `/api/business/entities`

Retrieve business entities with filtering and search capabilities.

**Query Parameters:**
- `entity_type` (optional): Filter by entity type
- `search` (optional): Search in name and description
- `tags` (optional): Comma-separated list of tags
- `page`, `limit`: Pagination

**Response (200 OK):**
```json
{
  "entities": [
    {
      "id": 456,
      "entity_type": "company",
      "name": "TechStartup Inc.",
      "description": "AI-powered startup...",
      "tags": ["startup", "ai"],
      "created_at": "2025-01-27T19:00:00Z"
    }
  ],
  "total": 12,
  "page": 1,
  "limit": 10
}
```

## 📊 Admin Endpoints (Role-Based Access)

### Get System Stats
**GET** `/api/admin/stats`

**Requires:** Admin role

**Response (200 OK):**
```json
{
  "total_users": 1234,
  "active_ai_tasks": 45,
  "completed_tasks_today": 156,
  "total_business_entities": 892,
  "system_health": "healthy"
}
```

### List All Users
**GET** `/api/admin/users`

**Requires:** Admin role

Comprehensive user management with pagination and filters.

## 🔧 API Client Implementation

### Frontend API Service Layer
```typescript
// packages/web/src/services/api.ts
class ApiClient {
  private baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  
  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }
    
    return response.json();
  }
}

// Service layer with typed methods
export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  async getCurrentUser(): Promise<User> {
    return apiClient.request<User>('/api/auth/me');
  }
};
```

### Error Handling
```typescript
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// React Query error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status === 401) {
          // Redirect to login for authentication errors
          window.location.href = '/auth';
          return false;
        }
        return failureCount < 3;
      }
    }
  }
});
```

## 🚀 Environment Configuration

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:8000
```

### Backend Environment Variables
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/monorepo_db
JWT_SECRET_KEY=your-super-secret-jwt-key-here
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=0.5
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

## 📈 Performance & Monitoring

### Request/Response Metrics
- Average response time: ~150ms
- Token expiration: 30 minutes
- Cache invalidation: Smart invalidation on mutations
- Polling interval: 3 seconds for AI tasks

### Status Codes
- **200**: Success
- **201**: Created
- **401**: Unauthorized (token expired/invalid)
- **403**: Forbidden (insufficient permissions)
- **404**: Resource not found
- **422**: Validation error
- **500**: Internal server error

### Development Tools

**Testing API Endpoints:**
```bash
# Test authentication
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'

# Test protected endpoint
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Interactive API Documentation:**
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

This comprehensive API documentation ensures seamless integration between the React frontend and FastAPI backend with proper error handling, authentication, and real-time updates.