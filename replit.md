# Overview

This is a unified development platform built as a monorepo structure that combines React web frontend, React Native mobile app, and backend services with **true cross-platform design capabilities**. The project features a sophisticated shared component system where the same component code runs seamlessly on both web and mobile platforms with automatic platform detection and optimization.

The repository demonstrates advanced full-stack development practices with TypeScript, featuring a cross-platform component library with unified theming, database integration using Drizzle ORM with PostgreSQL, and comprehensive shared business logic across web and mobile platforms. The architecture supports both FastAPI (Python) and Node.js backends with consistent API patterns.

# User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2025)

✅ **Cross-Platform Design Implementation Complete**
- Added true cross-platform component system (Button, Text, Container)
- Implemented unified theme system with light/dark mode support
- Created platform detection and automatic optimization
- Updated both web and mobile apps to demonstrate cross-platform capabilities
- All components use same code but render appropriately for each platform (web: DOM elements, mobile: React Native components)

✅ **Complete REST API Infrastructure (January 27, 2025)**
- Implemented comprehensive FastAPI backend with full REST endpoints
- Added JWT authentication system with bcrypt password hashing
- Created complete database schema with PostgreSQL and Drizzle ORM
- Built user management, AI processing, and business entity endpoints
- Added role-based access control (user, admin, moderator)
- Implemented audit logging for all user actions
- Created comprehensive API documentation with interactive Swagger UI
- Added security features: CORS protection, input validation, rate limiting design
- Integrated AI processing endpoints for text analysis, sentiment analysis, and content generation
- Built flexible business entity management system with JSON data storage

# System Architecture

## Frontend Architecture
- **Web Application**: React 18 with TypeScript using Vite as the build tool
- **Mobile Application**: React Native with Expo for cross-platform mobile development
- **UI Components**: Comprehensive component library using Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack React Query for server state management with custom query client configuration
- **Routing**: Wouter for lightweight client-side routing in the web app

## Backend Architecture
- **Hybrid Backend Support**: The project supports both Node.js/Express and FastAPI (Python) backends
- **Node.js Backend**: Express.js server with TypeScript, featuring middleware for logging, error handling, and development tooling
- **FastAPI Backend**: Python-based API with CORS support and Pydantic models for data validation
- **Development Integration**: Vite integration for hot module replacement and development server setup

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Centralized database schema definition in shared directory with Zod validation
- **Connection**: Neon Database serverless PostgreSQL adapter for cloud-native database connectivity
- **Migration System**: Drizzle Kit for database migrations and schema synchronization

## Authentication and Authorization
- **Session Management**: PostgreSQL-backed session storage using connect-pg-simple
- **User Management**: Basic user schema with username/password authentication
- **Storage Interface**: Abstracted storage layer supporting both in-memory and database implementations

## External Dependencies
- **Database**: Neon Database serverless PostgreSQL for production data storage
- **UI Framework**: Radix UI for accessible component primitives
- **Styling**: Tailwind CSS for utility-first styling with custom design system
- **Development Tools**: 
  - Vite for fast development and build processes
  - Replit-specific plugins for development environment integration
  - ESBuild for backend bundling and optimization
- **Mobile Development**: Expo SDK for React Native development and deployment
- **Type Safety**: Comprehensive TypeScript setup with shared type definitions across packages