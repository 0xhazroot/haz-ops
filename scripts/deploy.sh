#!/usr/bin/env bash
# =============================================================================
# Script de Despliegue Manual a AWS (S3 + CloudFront)
# =============================================================================
# Este script extrae los nombres de recursos directamente desde el estado
# de Terraform y ejecuta el despliegue con políticas de caché diferenciadas.
#
# Prerrequisitos:
#   - terraform en PATH
#   - aws cli v2 en PATH con credenciales activas
#   - npm en PATH

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
TERRAFORM_DIR="${ROOT_DIR}/terraform"

echo "🔍 Consultando outputs de Terraform..."
if [ ! -d "${TERRAFORM_DIR}/.terraform" ]; then
  echo "❌ Terraform no inicializado en ${TERRAFORM_DIR}. Ejecuta 'terraform init' primero."
  exit 1
fi

BUCKET_NAME=$(terraform -chdir="${TERRAFORM_DIR}" output -raw s3_bucket_name 2>/dev/null || true)
DISTRIBUTION_ID=$(terraform -chdir="${TERRAFORM_DIR}" output -raw cloudfront_distribution_id 2>/dev/null || true)
CLOUDFRONT_DOMAIN=$(terraform -chdir="${TERRAFORM_DIR}" output -raw cloudfront_domain_name 2>/dev/null || true)

if [ -z "${BUCKET_NAME}" ] || [ -z "${DISTRIBUTION_ID}" ]; then
  echo "❌ No se pudieron obtener s3_bucket_name o cloudfront_distribution_id de Terraform."
  exit 1
fi

echo "📦 Bucket S3 de destino: ${BUCKET_NAME}"
echo "🛡️ Distribución CloudFront: ${DISTRIBUTION_ID}"

echo "🔨 Compilando bundle de producción..."
cd "${ROOT_DIR}"
npm ci
npm run build

echo "📤 Sincronizando assets inmutables con hash (Cache-Control: 1 año)..."
aws s3 sync "${ROOT_DIR}/dist/assets/" "s3://${BUCKET_NAME}/assets/" \
  --delete \
  --cache-control "public, max-age=31536000, immutable"

echo "📤 Sincronizando archivos raíz e index.html (Cache-Control: no-cache)..."
aws s3 sync "${ROOT_DIR}/dist/" "s3://${BUCKET_NAME}/" \
  --delete \
  --exclude "assets/*" \
  --cache-control "no-cache, no-store, must-revalidate"

echo "🔄 Creando invalidación de caché en CloudFront..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id "${DISTRIBUTION_ID}" \
  --paths "/*" \
  --query 'Invalidation.Id' \
  --output text)

echo "✅ Invalidación registrada: ${INVALIDATION_ID}"
echo "🎉 Despliegue finalizado exitosamente en: ${CLOUDFRONT_DOMAIN}"
