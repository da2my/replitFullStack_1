# Overview

This is a unified development platform built as a monorepo structure that combines React web frontend, React Native mobile app, and backend services with shared utilities. The project appears to be in transition from a traditional Express.js backend to supporting both FastAPI (Python) and Node.js backends, with a focus on providing consistent tooling and shared components across all platforms.

The repository demonstrates modern full-stack development practices with TypeScript, featuring a comprehensive UI component library built with Radix UI and Tailwind CSS, database integration using Drizzle ORM with PostgreSQL, and shared business logic across web and mobile platforms.

# User Preferences

Preferred communication style: Simple, everyday language.

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