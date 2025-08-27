# REST API Documentation

This document provides comprehensive information about the REST endpoints available in the MonoRepo Backend API.

## Base URL
- Development: `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- Alternative Documentation: `http://localhost:8000/redoc`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

All API responses follow a consistent format:

```json
{
  "success": boolean,
  "message": string,
  "data": any,
  "timestamp": "ISO_8601_datetime"
}
```

## Endpoints

### Authentication Endpoints

#### Register User
**POST** `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user_id": "abc123def456"
  },
  "timestamp": "2025-01-01T12:00:00Z"
}
```

#### Login User
**POST** `/api/auth/login`

Authenticate user and receive access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

#### Get Current User
**GET** `/api/auth/me`

Get current authenticated user information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "abc123def456",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "user",
  "is_active": true,
  "created_at": "2025-01-01T12:00:00Z"
}
```

### User Management Endpoints

#### List Users
**GET** `/api/users`

List all users (admin only).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:**
```json
[
  {
    "id": "abc123def456",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "user",
    "is_active": true,
    "created_at": "2025-01-01T12:00:00Z"
  }
]
```

#### Get User by ID
**GET** `/api/users/{user_id}`

Get specific user information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "abc123def456",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "user",
  "is_active": true,
  "created_at": "2025-01-01T12:00:00Z"
}
```

#### Update User
**PUT** `/api/users/{user_id}`

Update user information.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "profile_image_url": "https://example.com/avatar.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "timestamp": "2025-01-01T12:00:00Z"
}
```

### User Profile Endpoints

#### Get User Profile
**GET** `/api/users/{user_id}/profile`

Get user profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "profile123",
  "user_id": "abc123def456",
  "bio": "Software developer passionate about technology",
  "preferences": {
    "theme": "dark",
    "notifications": true
  },
  "metadata": {
    "onboarding_completed": true
  },
  "created_at": "2025-01-01T12:00:00Z"
}
```

#### Update User Profile
**PUT** `/api/users/{user_id}/profile`

Update user profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "bio": "Updated bio information",
  "preferences": {
    "theme": "light",
    "notifications": false
  },
  "metadata": {
    "tutorial_completed": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "timestamp": "2025-01-01T12:00:00Z"
}
```

### AI Processing Endpoints

#### Create AI Task
**POST** `/api/ai/tasks`

Create and process an AI task.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "task_type": "text_analysis",
  "input_data": {
    "text": "This is sample text for analysis"
  }
}
```

**Available Task Types:**
- `text_analysis` - Analyze text content
- `sentiment_analysis` - Determine sentiment of text
- `image_processing` - Process image data
- `content_generation` - Generate content based on prompts

**Response:**
```json
{
  "success": true,
  "message": "AI task created and processing",
  "data": {
    "task_id": "task123abc"
  },
  "timestamp": "2025-01-01T12:00:00Z"
}
```

#### List AI Tasks
**GET** `/api/ai/tasks`

List user's AI tasks.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "task123abc",
    "user_id": "abc123def456",
    "task_type": "text_analysis",
    "status": "completed",
    "input_data": {
      "text": "Sample text"
    },
    "output_data": {
      "word_count": 2,
      "sentiment": "neutral",
      "confidence": 0.75
    },
    "error_message": null,
    "processing_time": 1250,
    "created_at": "2025-01-01T12:00:00Z"
  }
]
```

#### Get AI Task
**GET** `/api/ai/tasks/{task_id}`

Get specific AI task information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "task123abc",
  "user_id": "abc123def456",
  "task_type": "sentiment_analysis",
  "status": "completed",
  "input_data": {
    "text": "I love this product!"
  },
  "output_data": {
    "sentiment": "positive",
    "score": 0.89,
    "confidence": 0.92
  },
  "error_message": null,
  "processing_time": 980,
  "created_at": "2025-01-01T12:00:00Z"
}
```

### Business Entity Endpoints

#### Create Business Entity
**POST** `/api/business/entities`

Create a new business entity.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "My Business Project",
  "description": "A comprehensive business solution",
  "category": "technology",
  "data": {
    "budget": 50000,
    "team_size": 5
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Business entity created successfully",
  "data": {
    "entity_id": "entity123abc"
  },
  "timestamp": "2025-01-01T12:00:00Z"
}
```

#### List Business Entities
**GET** `/api/business/entities`

List user's business entities.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "entity123abc",
    "owner_id": "abc123def456",
    "name": "My Business Project",
    "description": "A comprehensive business solution",
    "category": "technology",
    "data": {
      "budget": 50000,
      "team_size": 5
    },
    "is_active": true,
    "created_at": "2025-01-01T12:00:00Z"
  }
]
```

#### Get Business Entity
**GET** `/api/business/entities/{entity_id}`

Get specific business entity information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "entity123abc",
  "owner_id": "abc123def456",
  "name": "Updated Business Project",
  "description": "An enhanced business solution",
  "category": "technology",
  "data": {
    "budget": 75000,
    "team_size": 8,
    "status": "active"
  },
  "is_active": true,
  "created_at": "2025-01-01T12:00:00Z"
}
```

### Utility Endpoints

#### Health Check
**GET** `/api/health`

Check API health and status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-01T12:00:00Z",
  "version": "2.0.0",
  "database": "connected",
  "services": {
    "auth": "active",
    "ai_processing": "active",
    "business_logic": "active"
  }
}
```

#### Validate Email
**GET** `/api/utils/validate-email/{email}`

Validate email format.

**Response:**
```json
{
  "email": "test@example.com",
  "is_valid": true,
  "timestamp": "2025-01-01T12:00:00Z"
}
```

#### API Statistics
**GET** `/api/stats`

Get API usage statistics (admin only).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "message": "API statistics retrieved",
  "data": {
    "total_users": 150,
    "active_users": 142,
    "total_ai_tasks": 1250,
    "completed_ai_tasks": 1180,
    "total_business_entities": 75,
    "total_audit_logs": 2500
  },
  "timestamp": "2025-01-01T12:00:00Z"
}
```

## Error Responses

The API returns standard HTTP status codes and error messages:

### 400 Bad Request
```json
{
  "detail": "Email already registered"
}
```

### 401 Unauthorized
```json
{
  "detail": "Invalid authentication credentials",
  "headers": {
    "WWW-Authenticate": "Bearer"
  }
}
```

### 403 Forbidden
```json
{
  "detail": "Access denied"
}
```

### 404 Not Found
```json
{
  "detail": "User not found"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

## Rate Limiting

The API implements rate limiting to ensure fair usage:
- General endpoints: 100 requests per minute
- Authentication endpoints: 5 requests per minute
- AI processing endpoints: 10 requests per minute

## Security Considerations

1. **JWT Tokens**: Expire after 30 minutes
2. **Password Hashing**: Uses bcrypt with salt
3. **CORS**: Configured for allowed origins only
4. **Audit Logging**: All user actions are logged
5. **Role-based Access**: Admin endpoints require admin role

## Development Notes

- The current implementation uses in-memory storage
- For production, replace with PostgreSQL database
- Add Redis for caching and session management
- Implement proper logging and monitoring
- Add comprehensive input validation
- Set up proper environment variables