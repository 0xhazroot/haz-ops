import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
import mime from 'mime-types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUCKET_NAME = 'haz-ops-frontend-a29b1390';
const DISTRIBUTION_ID = 'E5VVO550912H8';
const REGION = 'us-east-1';
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

const s3Client = new S3Client({ region: REGION });
const cfClient = new CloudFrontClient({ region: REGION });

async function uploadDirectory(dir, baseDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await uploadDirectory(fullPath, baseDir);
    } else {
      const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      const fileContent = fs.readFileSync(fullPath);
      const contentType = mime.lookup(fullPath) || 'application/octet-stream';

      console.log(`📤 Subiendo: ${relativePath} (${contentType})`);

      await s3Client.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: relativePath,
          Body: fileContent,
          ContentType: contentType,
          CacheControl: relativePath === 'index.html' ? 'no-cache, no-store, must-revalidate' : 'public, max-age=31536000, immutable'
        })
      );
    }
  }
}

async function invalidateCloudFront() {
  console.log(`🔄 Invalidando caché en CloudFront (${DISTRIBUTION_ID})...`);
  const response = await cfClient.send(
    new CreateInvalidationCommand({
      DistributionId: DISTRIBUTION_ID,
      InvalidationBatch: {
        CallerReference: `deploy-${Date.now()}`,
        Paths: {
          Quantity: 1,
          Items: ['/*']
        }
      }
    })
  );
  console.log(`✅ Invalidación creada: ${response.Invalidation.Id}`);
}

async function main() {
  console.log(`🚀 Iniciando despliegue hacia AWS S3 [${BUCKET_NAME}]...`);
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`❌ La carpeta dist/ no existe. Ejecuta 'npm run build' primero.`);
    process.exit(1);
  }

  await uploadDirectory(DIST_DIR);
  console.log(`✅ Todos los archivos subidos exitosamente a S3.`);

  await invalidateCloudFront();
  console.log(`\n🎉 Despliegue en AWS completado con éxito!`);
  console.log(`🔗 URL Oficial: https://d36uh9w4nau2ye.cloudfront.net\n`);
}

main().catch((err) => {
  console.error('❌ Error en el despliegue:', err);
  process.exit(1);
});
