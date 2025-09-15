# Invitación web — Mariana & Alexis

Frontend: React + Vite. Backend: AWS Lambda + DynamoDB (Serverless Framework).

## Frontend

1. Instalar dependencias:
```bash
pnpm i # o npm i / yarn
```
2. Configurar entorno:
```bash
cp .env.example .env
# Edita VITE_API_URL con tu URL de API Gateway (por ejemplo, https://abc123.execute-api.us-east-1.amazonaws.com/prod)
```
3. Ejecutar en desarrollo:
```bash
pnpm dev
```

## Backend (AWS Lambda + DynamoDB)

1. Requisitos: tener AWS CLI configurado y Serverless Framework instalado (`npm i -g serverless`).
2. Instalar dependencias del backend:
```bash
cd backend
pnpm i # o npm i / yarn
```
3. Desplegar:
```bash
sls deploy
```
4. Actualiza `VITE_API_URL` con la URL del API Gateway que imprime Serverless tras el deploy.

### Endpoint
- POST `/rsvp` — guarda la confirmación en DynamoDB.
  - Body JSON:
```json
{
  "name": "string",
  "phone": "string",
  "guests": 1,
  "attendsCeremony": "si|no|talvez",
  "attendsSpeech": "si|no|talvez",
  "attendsParty": "si|no|talvez",
  "message": "string"
}
``` # wedding
