#!/bin/bash

# Script para ejecutar el frontend web ReactJS optimizado
echo "🚀 Iniciando Frontend Web ReactJS..."
echo "📁 Navegando al directorio packages/web"

# Cambiar al directorio del frontend web
cd packages/web || {
    echo "❌ Error: No se puede acceder al directorio packages/web"
    exit 1
}

# Verificar si existe package.json
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json en packages/web"
    exit 1
fi

# Instalar dependencias si no existen node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

echo "🌐 Iniciando servidor de desarrollo..."
echo "✨ Frontend disponible en: http://localhost:3000"
echo "🔗 Backend FastAPI debe estar en: http://localhost:8000"
echo "📱 Usa Ctrl+C para detener el servidor"
echo ""

# Iniciar el servidor de desarrollo
npm run dev