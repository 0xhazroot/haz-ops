# =============================================================================
# Stage 1: Build de la SPA con Node.js
# =============================================================================
FROM node:25.2.1-alpine3.21 AS build
WORKDIR /app

# Copia de manifiestos y resolución estricta con npm ci
COPY package.json package-lock.json ./
RUN npm ci

# Compilación de la aplicación para producción
COPY . .
RUN npm run build

# =============================================================================
# Stage 2: Runtime unprivileged con Nginx (non-root)
# =============================================================================
FROM nginxinc/nginx-unprivileged:1.27-alpine

LABEL org.opencontainers.image.title="haz-ops" \
      org.opencontainers.image.description="Cloud & DevOps Engineer Portfolio SPA" \
      org.opencontainers.image.source="https://github.com/0xhazroot/haz-ops" \
      org.opencontainers.image.licenses="MIT"

# Sustitución de la configuración default por la optimizada para SPA
COPY nginx.conf /etc/nginx/nginx.conf

# Copia de artefactos compilados hacia el directorio estático
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Puerto no privilegiado expuesto por la imagen base
EXPOSE 8080

# Sonda de salud activa
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
