# Guía de Infraestructura como Código (Terraform) — haz-ops

Este directorio gestiona la infraestructura en AWS (S3, CloudFront OAC, políticas IAM y cabeceras de endurecimiento HTTP) de forma declarativa y reproducible.

Para la visión global de arquitectura y decisiones técnicas, consulta el [README principal del repositorio](../README.md).

---

## 📋 Prerrequisitos

- **Terraform** `>= 1.5.0`
- **AWS CLI v2** configurado con credenciales (`aws configure`) o variables de entorno estándar (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`).

---

## 🚀 Flujo Seguro de Despliegue

Sigue el flujo estándar de ingeniería de plataforma: formateo, validación, generación de plan de ejecución auditado y aplicación inmutable.

### 1. Formato y Validación Estática
```bash
terraform fmt -check
terraform validate
```

### 2. Inicialización
Descarga e inicializa los providers (`aws`, `random`) fijados en `.terraform.lock.hcl`:
```bash
terraform init
```

### 3. Planificación Auditada
Genera un archivo de plan binario (`tfplan`) para garantizar que lo que apruebas sea exactamente lo que se aplique:
```bash
terraform plan -out=tfplan
```

### 4. Aplicación Controlada
Aplica el plan previamente generado sin margen de error humano:
```bash
terraform apply tfplan
```

Al finalizar, consulta los outputs de conexión:
```bash
terraform output
```

---

## 📦 Migración a Estado Remoto con Bloqueo (Roadmap)

Actualmente este repositorio usa estado local para bootstrapping individual. Para equipos o pipelines compartidos, consulta la plantilla [backend.tf.example](./backend.tf.example):

1. Provisiona un bucket S3 privado con versionado y cifrado AES256.
2. Provisiona una tabla DynamoDB (`terraform-locks`) con clave de partición `LockID` (String).
3. Renombra `backend.tf.example` a `backend.tf` y ajusta los nombres.
4. Ejecuta:
   ```bash
   terraform init -migrate-state
   ```

---

## ⚠️ Destrucción Controlada de Recursos

> [!WARNING]
> La destrucción eliminará la CDN perimetral y el bucket S3 (incluyendo su contenido por `force_destroy = true`). Ejecuta únicamente cuando desees retirar la infraestructura para evitar costes residuales:

```bash
terraform plan -destroy -out=destroy.tfplan
terraform apply destroy.tfplan
```
