# Guía Práctica de Despliegue en AWS con Terraform

Esta arquitectura despliega el frontend estático en **AWS S3** protegido tras una CDN global con **AWS CloudFront** utilizando **Origin Access Control (OAC)**.

---

## 🏛️ Diagrama de Arquitectura

```
Usuario (Internet)
       │ (HTTPS)
       ▼
[AWS CloudFront CDN]  <-- Caché perimetral global + TLS
       │ (OAC - Origin Access Control / SigV4)
       ▼
 [AWS S3 Bucket]      <-- Acceso público bloqueado (Zero-Trust)
```

---

## 📋 Prerrequisitos

1. **AWS CLI** instalado y configurado con tus credenciales:
   ```bash
   aws configure
   ```
2. **Terraform** instalado (versión >= 1.5.0):
   ```bash
   terraform -v
   ```

---

## 🚀 Despliegue Paso a Paso

### 1. Inicializar Terraform
Descarga el provider oficial de AWS:
```bash
cd terraform
terraform init
```

### 2. Planificar la Infraestructura
Revisa los recursos que se van a crear (Bucket S3, OAC, Distribución CloudFront, Políticas IAM de Bucket):
```bash
terraform plan
```

### 3. Aplicar y Crear los Recursos
```bash
terraform apply -auto-approve
```
Al finalizar, Terraform mostrará los `outputs`:
- `s3_bucket_name`: Nombre del bucket único creado.
- `cloudfront_domain_name`: URL pública HTTPS (ej. `https://d123456abcdef8.cloudfront.net`).
- `cloudfront_distribution_id`: ID para invalidaciones de caché.

---

### 4. Compilar y Subir el Portafolio a S3

Compila el proyecto React/Vite desde la raíz y sube la carpeta `dist`:

```bash
# Desde la raíz del proyecto
npm run build

# Sincronizar archivos con el bucket S3 creado
aws s3 sync dist/ s3://<s3_bucket_name> --delete

# Invalidar la caché de CloudFront para reflejar cambios de inmediato
aws cloudfront create-invalidation --distribution-id <cloudfront_distribution_id> --paths "/*"
```

---

## 🧹 Destrucción de Recursos (Para evitar costos innecesarios)

Si estás practicando y deseas eliminar toda la infraestructura creada en AWS:

```bash
cd terraform
terraform destroy -auto-approve
```
