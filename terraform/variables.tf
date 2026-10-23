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

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "El ambiente debe ser exactamente 'dev', 'staging' o 'prod'."
  }
}

variable "price_class" {
  description = "Clase de precio de CloudFront para optimizacion de costos (PriceClass_100 cubre NA y Europa con menor costo)"
  type        = string
  default     = "PriceClass_100"

  validation {
    condition     = contains(["PriceClass_100", "PriceClass_200", "PriceClass_All"], var.price_class)
    error_message = "price_class debe ser PriceClass_100, PriceClass_200 o PriceClass_All."
  }
}
