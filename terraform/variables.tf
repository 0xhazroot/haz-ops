variable "aws_region" {
  description = "Región de AWS donde se alojarán los recursos"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Identificador del proyecto utilizado como prefijo de recursos"
  type        = string
  default     = "haz-ops"
}

variable "environment" {
  description = "Ambiente de despliegue (dev, staging, prod)"
  type        = string
  default     = "prod"
}
