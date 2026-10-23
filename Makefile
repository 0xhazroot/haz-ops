.PHONY: help install dev build lint tf-init tf-plan tf-apply deploy clean

help:
	@echo "Comandos disponibles en haz-ops:"
	@echo "  make install    - Instala dependencias con npm ci"
	@echo "  make dev        - Inicia el servidor de desarrollo local"
	@echo "  make lint       - Ejecuta el análisis estático con ESLint"
	@echo "  make build      - Compila el bundle de producción en dist/"
	@echo "  make tf-init    - Inicializa proveedores de Terraform"
	@echo "  make tf-plan    - Genera plan de ejecución de infraestructura"
	@echo "  make tf-apply   - Aplica el plan en AWS"
	@echo "  make deploy     - Compila y despliega en S3 + CloudFront"

install:
	npm ci

dev:
	npm run dev

lint:
	npm run lint

build:
	npm run build

tf-init:
	cd terraform && terraform init

tf-plan:
	cd terraform && terraform plan -out=tfplan

tf-apply:
	cd terraform && terraform apply tfplan

deploy: build
	bash scripts/deploy.sh
