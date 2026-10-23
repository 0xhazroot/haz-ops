# =============================================================================
# Configuracion OIDC para GitHub Actions (Autenticacion sin llaves estaticas)
# =============================================================================
# Esta configuracion permite que GitHub Actions asuma un rol IAM temporal
# en AWS mediante tokens criptograficos JWT, eliminando la necesidad de
# almacenar AWS_ACCESS_KEY_ID o AWS_SECRET_ACCESS_KEY en GitHub Secrets.

variable "enable_github_oidc" {
  description = "Habilita la creacion del proveedor OIDC y rol IAM para GitHub Actions"
  type        = bool
  default     = false
}

variable "github_repository" {
  description = "Repositorio de GitHub en formato organizacion/repositorio"
  type        = string
  default     = "0xhazroot/haz-ops"
}

# -----------------------------------------------------------------------------
# 1. OpenID Connect Provider para GitHub (sts.amazonaws.com)
# -----------------------------------------------------------------------------
resource "aws_iam_openid_connect_provider" "github_actions" {
  count = var.enable_github_oidc ? 1 : 0

  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1", "1c5876126b3040e277a7b3db0ed7ea7d49ff540a"]
}

# -----------------------------------------------------------------------------
# 2. Rol IAM asumible unicamente por la rama main de este repositorio
# -----------------------------------------------------------------------------
resource "aws_iam_role" "github_actions_deploy" {
  count = var.enable_github_oidc ? 1 : 0
  name  = "${var.project_name}-github-actions-deploy"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github_actions[0].arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_repository}:ref:refs/heads/main"
          }
        }
      }
    ]
  })
}

# -----------------------------------------------------------------------------
# 3. Politica de Minimo Privilegio (Solo S3 frontend y CloudFront invalidation)
# -----------------------------------------------------------------------------
resource "aws_iam_role_policy" "github_actions_permissions" {
  count = var.enable_github_oidc ? 1 : 0
  name  = "${var.project_name}-deploy-policy"
  role  = aws_iam_role.github_actions_deploy[0].id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "S3SyncPermissions"
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:ListBucket",
          "s3:DeleteObject"
        ]
        Resource = [
          aws_s3_bucket.frontend_bucket.arn,
          "${aws_s3_bucket.frontend_bucket.arn}/*"
        ]
      },
      {
        Sid    = "CloudFrontInvalidationPermissions"
        Effect = "Allow"
        Action = [
          "cloudfront:CreateInvalidation",
          "cloudfront:GetInvalidation"
        ]
        Resource = aws_cloudfront_distribution.s3_distribution.arn
      }
    ]
  })
}

output "github_actions_role_arn" {
  description = "ARN del rol OIDC para configurar en la variable AWS_ROLE_ARN de GitHub Actions"
  value       = var.enable_github_oidc ? aws_iam_role.github_actions_deploy[0].arn : null
}
