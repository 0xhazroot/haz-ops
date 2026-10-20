<div align="center">
  <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop" width="100%" alt="DevOps Network Nodes" style="border-radius: 12px;" />

  <br />
  <br />

  <h1>🌌 Samir Haziel — Cloud & DevOps Engineer Portfolio</h1>
  
  <p>
    <strong>Arquitectura Cloud Resiliente • Infraestructura como Código (IaC) • CI/CD & DevSecOps</strong>
  </p>

  <p>
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite_8-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" /></a>
    <a href="https://aws.amazon.com/"><img src="https://img.shields.io/badge/AWS_Cloud-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=FF9900" alt="AWS" /></a>
    <a href="https://www.terraform.io/"><img src="https://img.shields.io/badge/Terraform_IaC-844FBA?style=for-the-badge&logo=terraform&logoColor=white" alt="Terraform" /></a>
    <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel_Edge-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" /></a>
  </p>
</div>

---

## ⚡ Sobre el Proyecto

Este repositorio contiene la arquitectura y el código fuente de mi **Portafolio Profesional** como Cloud & DevOps Engineer. Diseñado con una experiencia inmersiva y moderna en el frontend, y respaldado por prácticas sólidas de ingeniería de infraestructura en la nube.

---

## ☁️ Arquitectura Cloud en AWS (Infraestructura como Código con Terraform)

El proyecto incluye una arquitectura estandarizada en AWS contenida en el directorio [`/terraform`](./terraform), implementada con principios de **Zero-Trust** y alta disponibilidad:

```mermaid
graph LR
    User([🌐 Usuario en Internet]) -->|HTTPS / TLS| CF[🛡️ AWS CloudFront CDN]
    CF -->|Origin Access Control SigV4| S3[(🪣 AWS S3 Bucket)]
    subgraph AWS Cloud [Infraestructura Gestionada con Terraform]
        CF
        S3
    end
```

### 🔒 Pilares de la Arquitectura AWS:
1. **AWS S3 (Almacenamiento Estático):** Alojamiento de los artefactos compilados de la SPA (`dist/`). El bucket tiene **bloqueo total de acceso público** activado (`BlockPublicAcls = true`, `BlockPublicPolicy = true`).
2. **AWS CloudFront (CDN Perimetral):** Distribuye el contenido a través de más de 400 puntos de presencia globales (Edge Locations) con compresión Gzip/Brotli y certificado SSL automático.
3. **Origin Access Control (OAC):** Mecanismo de seguridad de última generación de AWS que autentica cada petición entre CloudFront y S3 mediante firmas criptográficas SigV4, garantizando que nadie pueda evadir la CDN ni acceder directamente al bucket.
4. **Manejo de Errores SPA:** Respuestas de error personalizadas para redirigir códigos 403/404 hacia `/index.html` con código HTTP 200, permitiendo enrutamiento fluido en el cliente.

> 📖 *Para ver la guía paso a paso de inicialización (`terraform init`, `plan`, `apply`), consulta [terraform/README.md](./terraform/README.md).*

---

## 🛠️ Stack Tecnológico

| Área | Tecnologías |
| :--- | :--- |
| **Cloud Computing** | ☁️ AWS (S3, CloudFront, OAC, IAM, Route53), ⚡ Vercel Edge Network |
| **Infraestructura como Código (IaC)** | 🏗️ Terraform (HCL), Módulos reutilizables |
| **Contenedores & Orquestación** | 🐋 Docker, Docker Compose, ☸️ Kubernetes |
| **Automatización & CI/CD** | 🤖 GitHub Actions, Dependabot |
| **Frontend & UI Engine** | ⚛️ React 19, ⚡ Vite 8, 🎬 Framer Motion, 🎨 Canvas API (Nodos 3D) |

---

## 🚀 Despliegue

### 1. Despliegue en la Nube (AWS con Terraform)
```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### 2. Despliegue Rápido (Vercel)
El proyecto está preconfigurado con [`vercel.json`](./vercel.json) para despliegues instantáneos desde GitHub con soporte SPA y optimización de caché.

### 3. Ejecución Local (Desarrollo)
```bash
# Instalar dependencias
npm install

# Iniciar servidor local
npm run dev
```

---

## 🤖 Mantenimiento & Automatización

- **Dependabot:** Actualizaciones de seguridad automáticas semanales para dependencias npm y providers de Terraform.
- **Auditoría de dependencias:** Verificación continua de vulnerabilidades en librerías de producción.
