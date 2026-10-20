output "s3_bucket_name" {
  description = "Nombre del bucket S3 creado"
  value       = aws_s3_bucket.frontend_bucket.id
}

output "cloudfront_distribution_id" {
  description = "ID de la distribucion de CloudFront para invalidaciones de cache"
  value       = aws_cloudfront_distribution.s3_distribution.id
}

output "cloudfront_domain_name" {
  description = "URL publica segura (HTTPS) provista por CloudFront"
  value       = "https://${aws_cloudfront_distribution.s3_distribution.domain_name}"
}
