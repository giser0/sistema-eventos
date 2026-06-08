# 1️⃣ Imagen base
FROM node:20-alpine

# 2️⃣ Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3️⃣ Copiar package.json y package-lock.json
COPY package*.json ./

# 4️⃣ Instalar dependencias
RUN npm install

# 5️⃣ Copiar todo el proyecto
COPY . .

# 6️⃣ Compilar NestJS
RUN npm run build

# 7️⃣ Exponer puerto
EXPOSE 3000

# 8️⃣ Ejecutar la app
CMD ["node", "dist/main.js"]