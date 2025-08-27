# Frontend Web ReactJS

Frontend web optimizado con ReactJS que consume las APIs REST del backend FastAPI.

## 🚀 Características

- **React 18** con TypeScript para máximo rendimiento
- **Vite** para builds ultra-rápidos y hot reload
- **Wouter** para routing ligero
- **TanStack Query** para manejo de estado del servidor
- **Tailwind CSS** + **Radix UI** para componentes accesibles
- **React Hook Form** + **Zod** para formularios validados
- **Integración completa** con APIs REST de FastAPI

## 🛠️ Tecnologías Utilizadas

### Core
- React 18.3.1 con TypeScript
- Vite 5.4+ para desarrollo y build
- Wouter para routing client-side

### Estado y Datos
- TanStack React Query v5 para server state
- React Hook Form para formularios
- Zod para validación de datos

### UI/UX
- Tailwind CSS para styling utility-first
- Radix UI para componentes primitivos accesibles
- Lucide React para iconografía
- Class Variance Authority para variants

### APIs
- Cliente REST personalizado con manejo de errores
- Integración con FastAPI backend
- Autenticación JWT con localStorage

## 📁 Estructura del Proyecto

```
packages/web/
├── src/
│   ├── components/ui/     # Componentes UI reutilizables
│   ├── hooks/            # React hooks personalizados
│   ├── lib/              # Utilidades y configuraciones
│   ├── pages/            # Páginas/vistas de la aplicación
│   ├── services/         # Cliente API y servicios
│   ├── types/            # Definiciones de tipos TypeScript
│   ├── App.tsx           # Componente raíz con routing
│   ├── main.tsx          # Entry point de React
│   └── index.css         # Estilos globales con Tailwind
├── public/               # Assets estáticos
├── vite.config.ts        # Configuración de Vite
├── tailwind.config.js    # Configuración de Tailwind CSS
├── tsconfig.json         # Configuración de TypeScript
└── package.json          # Dependencias y scripts
```

## 🚦 Cómo Ejecutar

### Prerequisitos
- Node.js 18+ y npm
- Backend FastAPI ejecutándose en `http://localhost:8000`

### Desarrollo

1. **Instalar dependencias:**
   ```bash
   cd packages/web
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **La aplicación estará disponible en:**
   `http://localhost:3000`

### Scripts Disponibles

```bash
# Desarrollo con hot reload
npm run dev

# Build para producción
npm run build

# Preview del build de producción
npm run preview

# Verificación de tipos TypeScript
npm run type-check

# Linting del código
npm run lint
```

## 🔗 Integración con APIs

### Cliente API
El frontend consume las siguientes APIs REST del backend FastAPI:

#### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Autenticación (retorna JWT)
- `GET /api/auth/me` - Información del usuario actual

#### Tareas de IA
- `POST /api/ai/tasks` - Crear tarea de procesamiento IA
- `GET /api/ai/tasks` - Listar tareas del usuario
- `GET /api/ai/tasks/{task_id}` - Obtener tarea específica

#### Entidades de Negocio
- `POST /api/business/entities` - Crear entidad de negocio
- `GET /api/business/entities` - Listar entidades del usuario
- `GET /api/business/entities/{entity_id}` - Obtener entidad específica

### Manejo de Estado

```typescript
// Ejemplo de uso de hooks personalizados
import { useAuth } from '@/hooks/useAuth';
import { useAITasks } from '@/hooks/useAITasks';

function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const { tasks, createTask, isCreating } = useAITasks();
  
  // Componente usa estado del servidor automáticamente
}
```

### Configuración de API
```typescript
// src/services/api.ts - Cliente API tipado
export const apiClient = new ApiClient();
export const authService = { login, register, getCurrentUser };
export const aiService = { createTask, getTasks };
```

## 🎨 Componentes UI

### Ejemplos de Uso
```typescript
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormField } from '@/components/ui/form';

// Componentes accesibles listos para usar
<Button variant="primary" onClick={handleClick}>
  Crear Tarea IA
</Button>

<Card>
  <CardHeader>
    <h2>Dashboard</h2>
  </CardHeader>
  <CardContent>
    Contenido del dashboard...
  </CardContent>
</Card>
```

### Componentes Disponibles
- **Formularios**: Button, Input, Textarea, Select, Checkbox
- **Layout**: Card, Container, Separator, Tabs
- **Feedback**: Toast, Badge, Progress, Skeleton
- **Navegación**: Routing con Wouter

## 🔐 Autenticación

### Flow de Autenticación
1. Usuario accede a `/auth`
2. Puede registrarse o iniciar sesión
3. Backend retorna JWT token
4. Token se almacena en localStorage
5. Requests subsecuentes incluyen token en headers
6. Rutas protegidas verifican autenticación

### Protección de Rutas
```typescript
// Redirección automática si no está autenticado
const { isAuthenticated, isLoading } = useAuth();

if (!isLoading && !isAuthenticated) {
  window.location.href = '/auth';
}
```

## 🚀 Características Avanzadas

### Proxy de Desarrollo
```typescript
// vite.config.ts - Proxy a FastAPI
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
});
```

### Manejo de Errores
```typescript
// Manejo automático de errores de API
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
```

### Actualizaciones en Tiempo Real
- Polling automático cada 3 segundos para tareas IA
- Invalidación inteligente de cache
- Estados de loading optimistas

## 📋 Variables de Entorno

Crea un archivo `.env.local`:

```env
VITE_API_URL=http://localhost:8000
```

## 🎯 Próximos Pasos

1. **Server-Side Rendering (SSR)**: Migrar a Next.js para mejor SEO
2. **PWA**: Añadir service workers para funcionalidad offline  
3. **Tests**: Implementar testing con Vitest y Testing Library
4. **Storybook**: Documentar componentes UI

## 🔧 Troubleshooting

### Problemas Comunes

**Error de CORS:**
```bash
# Verificar que el backend FastAPI esté configurado con CORS
# Allow origins: ["http://localhost:3000"]
```

**Error de TypeScript:**
```bash
# Verificar paths en tsconfig.json
npm run type-check
```

**Error de conexión API:**
```bash
# Verificar que FastAPI esté ejecutándose en puerto 8000
curl http://localhost:8000/api/health
```

Este frontend web ReactJS está optimizado para desarrollo profesional con todas las mejores prácticas modernas integradas.