<div align="center">
  <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop" width="100%" alt="DevOps Network Nodes" style="border-radius: 12px;" />

  <br />
  <br />

  <h1>🌌 Samir Haziel — Cloud & DevOps Engineer Portfolio</h1>
  
  <p>
    <strong>Arquitectura Resiliente • Automatización • Infraestructura como Código (IaC)</strong>
  </p>

  <p>
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" /></a>
    <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue" alt="Framer Motion" /></a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API"><img src="https://img.shields.io/badge/HTML5_Canvas-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="Canvas" /></a>
  </p>
</div>

---

## ⚡ Sobre el Proyecto

Este repositorio contiene el código fuente de mi **Portafolio Profesional**. Ha sido diseñado bajo una estricta filosofía minimalista y elegante, enfocada en la experiencia de usuario (UX) y el altísimo rendimiento (Zero lag). 

En el fondo, un algoritmo en puro `Canvas API` genera una **malla de nodos 3D** en tiempo real que reacciona sutilmente al ratón, representando una red de clústeres y orquestación distribuida (como *Kubernetes*).

### ✨ Características Destacadas
- 🪟 **Glassmorphism UI:** Tarjetas translúcidas para un efecto inmersivo.
- 📉 **Zero Bloatware:** Código CSS nativo y JavaScript puro para las físicas computacionales, sin pesadas librerías 3D de terceros.
- 🎬 **Animaciones Sedosas:** Revelado en cascada y transiciones potenciadas por *Framer Motion*.
- 📱 **100% Responsivo:** Adaptado matemáticamente a cualquier pantalla (Mobile First interpolado).

---

## 🛠️ Stack Tecnológico & Herramientas

Mi enfoque profesional abarca el ciclo de vida completo de DevOps:

| Categoría | Tecnologías Clave |
| :--- | :--- |
| **Orquestación & Contenedores** | 🐋 Docker, ☸️ Kubernetes |
| **Cloud Computing** | ☁️ AWS, ☁️ Azure |
| **Infraestructura (IaC)** | 🏗️ Terraform |
| **Automatización (CI/CD)** | 🤖 GitHub Actions, 🛠️ Jenkins, ⚙️ Ansible |
| **Observabilidad & Monitorización** | 📊 Prometheus, 📈 Grafana |
| **Sistemas Base** | 🐧 GNU/Linux, 🐚 Bash Scripting |

---

## 🚀 Despliegue Local

### Opción A: Usando NPM (Tradicional)
```bash
# 1. Instala las dependencias
npm install

# 2. Inicia el servidor de desarrollo
npm run dev
```

### Opción B: Usando Docker (Recomendado si NPM falla) 🐋
Contenedor optimizado para desarrollo con Hot Reload:

```bash
# 1. Iniciar en modo desarrollo (reemplaza npm run dev)
docker-compose up dev

# 2. (Opcional) Construir y correr versión de producción
docker-compose up app
```

*(Luego, abre `http://localhost:5173/` para la versión de desarrollo o `http://localhost:8080/` para la producción)*.

---

## 🤖 Mantenimiento & Automatización (DevOps)

Este proyecto está configurado para ser **autónomo** y **escalable**:

### 📦 CI/CD (GitHub Actions)
Cada vez que subas cambios a la rama `main`, GitHub:
1. Verifica que el proyecto compile correctamente.
2. Construye una nueva imagen de Docker.
3. La sube automáticamente a tu **Docker Hub**.

### 🛠️ Dependabot
GitHub revisará semanalmente si hay actualizaciones de seguridad o de librerías (Vite, React, Framer Motion) y creará una *Pull Request* para que las aceptes con un solo clic.

### 🔑 Configuración de Secretos
Para que el robot pueda subir imágenes a tu Docker Hub, añade estos dos secretos en `Settings > Secrets and variables > Actions`:
*   `DOCKER_USERNAME`: Tu usuario de Docker Hub.
*   `DOCKER_PASSWORD`: Tu Access Token de Docker Hub.

---
