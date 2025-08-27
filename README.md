# MonoRepo: Cross-Platform Development Environment

A unified development platform built as a comprehensive monorepo structure that combines React web frontend, React Native mobile app, and backend services with **true cross-platform design capabilities** and **complete REST API infrastructure**.

## Key Features

- **Cross-Platform Design System**: Same component code runs seamlessly on both web and mobile platforms
- **Complete Authentication System**: JWT-based auth with user management and role-based access
- **AI Processing Endpoints**: Text analysis, sentiment analysis, and content generation
- **Business Logic APIs**: Entity management with flexible data structures
- **Unified Theme System**: Light/dark mode support with automatic platform detection
- **Comprehensive Database**: PostgreSQL schema with user profiles, AI tasks, and audit logging
- **Modern Tech Stack**: React 18, React Native, TypeScript, FastAPI, Node.js, PostgreSQL
- **Development Ready**: Hot reload, comprehensive tooling, and instant setup

## Project Structure

```
├── packages/
│   ├── web/                 # React web application
│   ├── mobile/              # React Native mobile app  
│   ├── backend/             # FastAPI Python backend with comprehensive REST APIs
│   └── shared/              # Cross-platform components & utilities
├── server/                  # Node.js backend (alternative/development)
├── shared/                  # Database schema & types (PostgreSQL with Drizzle ORM)
├── API_DOCUMENTATION.md     # Complete REST API reference
└── docs/                    # Additional documentation
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+ (for FastAPI backend)
- PostgreSQL database (configured automatically)

### Quick Start

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up database schema:**
   ```bash
   npm run db:push
   ```

3. **Start all development servers:**
   ```bash
   npm run dev
   ```

This starts:
- **Web app**: `http://localhost:5173` (React with Vite)
- **Node.js backend**: `http://localhost:5000` (Development/Auth server)
- **FastAPI backend**: `http://localhost:8000` (Complete REST API)
- **API Documentation**: `http://localhost:8000/docs` (Interactive Swagger UI)

## REST API Endpoints

Our FastAPI backend provides comprehensive REST endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication (returns JWT)
- `GET /api/auth/me` - Get current user info

### User Management
- `GET /api/users` - List all users (admin only)
- `GET /api/users/{user_id}` - Get user by ID
- `PUT /api/users/{user_id}` - Update user information
- `GET /api/users/{user_id}/profile` - Get user profile
- `PUT /api/users/{user_id}/profile` - Update user profile

### AI Processing
- `POST /api/ai/tasks` - Create AI processing task
- `GET /api/ai/tasks` - List user's AI tasks
- `GET /api/ai/tasks/{task_id}` - Get specific AI task

**Supported AI Task Types:**
- `text_analysis` - Analyze text content (word count, keywords)
- `sentiment_analysis` - Determine sentiment and confidence
- `image_processing` - Process image data
- `content_generation` - Generate content from prompts

### Business Entities
- `POST /api/business/entities` - Create business entity
- `GET /api/business/entities` - List user's entities
- `GET /api/business/entities/{entity_id}` - Get specific entity

### Utilities
- `GET /api/health` - Health check and service status
- `GET /api/utils/validate-email/{email}` - Email validation
- `GET /api/stats` - API usage statistics (admin only)

**Complete API Documentation**: [View API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## Cross-Platform Design System

Our unique design system allows the same component code to work across web and mobile:

```typescript
// Same component works on both platforms
import { Button, Text, Container } from '@shared/components';

function MyComponent() {
  return (
    <Container>
      <Text>Hello World</Text>
      <Button onPress={() => alert('Works everywhere!')}>
        Click me
      </Button>
    </Container>
  );
}
```

**Platform Detection:**
- **Web**: Renders as HTML/CSS with Tailwind styling
- **Mobile**: Renders as React Native components
- **Automatic theme adaptation**: Light/dark mode support
- **Responsive design**: Built-in responsive behavior

## Database Schema

Comprehensive PostgreSQL schema with Drizzle ORM:

### Core Tables
- **users** - Authentication and basic user info
- **user_profiles** - Extended user data and preferences  
- **sessions** - Session management for authentication
- **ai_tasks** - AI processing task tracking
- **business_entities** - Flexible business data structures
- **audit_logs** - Complete user action tracking

### Features
- **Role-based access** (user, admin, moderator)
- **JSON data storage** for flexible schemas
- **Automatic timestamps** and audit trails
- **Foreign key relationships** with cascade deletes
- **Type-safe operations** with Drizzle ORM and Zod validation

## Security Implementation

- **JWT Authentication**: 30-minute token expiration with secure headers
- **bcrypt Password Hashing**: Industry-standard password security
- **Role-Based Access Control**: Admin, moderator, and user roles
- **CORS Protection**: Configured for allowed origins only
- **Input Validation**: Pydantic models with type checking
- **Audit Logging**: Complete tracking of user actions with IP and user agent

## Available Scripts

### Development
- `npm run dev` - Start Node.js development server (current implementation)
- `./start-web.sh` - Start optimized React web frontend on port 3000
- `cd packages/mobile && npm start` - Start mobile development with Expo
- `cd packages/backend && python main.py` - Start FastAPI backend server

### Database
- `npm run db:push` - Push database schema changes
- `npm run db:push --force` - Force push schema changes

### Build & Quality
- `npm run build` - Build all packages
- `npm run lint` - Run ESLint across all packages
- `npm run clean` - Clean all build artifacts

## Technology Stack

### Frontend
- **React Web App** (packages/web/): Optimized ReactJS with Vite, TypeScript, TanStack Query
- **React Native App** (packages/mobile/): Expo-based mobile application
- **Current Web** (client/): Legacy implementation, use packages/web/ for new development
- **Tailwind CSS** for utility-first styling across all frontends
- **Radix UI** for accessible component primitives
- **Cross-platform Components** via shared package

### Backend  
- **FastAPI** (Python) - Primary API with auto-documentation
- **Express.js** (Node.js) - Development/auth server
- **PostgreSQL** with Neon Database cloud hosting
- **Drizzle ORM** for type-safe database operations
- **JWT** for stateless authentication
- **bcrypt** for secure password hashing

### Development Tools
- **npm workspaces** for efficient monorepo management
- **TypeScript** for full-stack type safety
- **ESLint** for consistent code quality
- **Zod** for runtime type validation
- **Hot reload** across all platforms

## API Testing

Test the complete API using the interactive documentation:

1. **Start the backend**: `npm run backend`
2. **Open API docs**: `http://localhost:8000/docs`
3. **Register a user**: Use `/api/auth/register` endpoint
4. **Login and get token**: Use `/api/auth/login` endpoint  
5. **Test protected endpoints**: Click "Authorize" and enter your JWT token
6. **Try AI processing**: Create tasks with `/api/ai/tasks`

## Documentation

- **[Complete API Reference](./API_DOCUMENTATION.md)** - All endpoints with examples
- **[Component Guide](./packages/shared/README.md)** - Cross-platform component usage
- **[Database Schema](./shared/schema.ts)** - Complete data model documentation
- **[Architecture Overview](./replit.md)** - Project architecture and preferences

