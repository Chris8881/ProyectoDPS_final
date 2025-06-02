# Imagen base oficial de Node
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias con npm
RUN npm install

# Copiar todo el proyecto
COPY . .

# Instalar Expo CLI globalmente
RUN npm install -g expo-cli

# Exponer puertos necesarios para Metro y Expo Go
EXPOSE 8081 19000 19001 19002

# Comando por defecto: iniciar Expo en modo tÃºnel
CMD ["npx", "expo", "start", "--tunnel"]
