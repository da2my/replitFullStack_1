#!/bin/bash
echo "🚀 Iniciando Frontend Web ReactJS..."
echo "📁 Cambiando al directorio del frontend web..."
cd packages/web

echo "📦 Instalando dependencias..."
npm install

echo "🌐 Iniciando servidor de desarrollo en puerto 3000..."
echo "✨ Frontend disponible en: http://localhost:3000"
echo "🔗 Asegúrate de que el backend FastAPI esté ejecutándose en: http://localhost:8000"
echo ""

npm run dev