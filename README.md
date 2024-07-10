<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Students API

Este proyecto es una API serverless construida con NestJS que permite realizar operaciones CRUD en datos de estudiantes. Utiliza AWS DynamoDB para el almacenamiento de datos e integra AWS Lambda usando el Serverless Framework.

## Características

- **Operaciones CRUD**: Crear, Leer, Actualizar y Eliminar registros de estudiantes.
- **Health Check**: Endpoint para verificar la salud de la aplicación y sus dependencias.
- **Autenticación con API Key**: Asegura los endpoints de la API con una API key.
- **Documentación con Swagger**: Documentación de la API generada automáticamente.
- **Pruebas Unitarias y E2E**: Pruebas exhaustivas utilizando Jest.

## Comenzando

### Requisitos Previos

- Node.js (versión 18.x o superior)
- Cuenta de AWS con permisos adecuados
- Serverless Framework CLI
- AWS CLI configurado con tus credenciales

### Instalación

Instala las dependencias:
```bash
$ npm install
```
Instala DynamoDB Local (opcional para pruebas locales):
```bash
$ serverless dynamodb install
```
## Configuracion 
- Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:

```bash
AWS_ACCESS_KEY_ID=<tu-aws-access-key-id>
AWS_SECRET_ACCESS_KEY=<tu-aws-secret-access-key>
AWS_REGION=us-east-1
STUDENTS_TABLE=students-table
API_KEY=tu-api-key-segura
```

- Asegúrate de que la tabla DynamoDB students-table existe en AWS. Puedes crearla manualmente a través de la consola de AWS o usando una herramienta de infraestructura como código.

## Ejecutando la Aplicación

### Localmente

- Para ejecutar la aplicación localmente con Serverless Offline y DynamoDB Local:

### Desplegando en AWS
- Para desplegar la aplicación en AWS:

```bash

$ serverless deploy
```

## Uso
- Una vez que la aplicación esté en funcionamiento, puedes acceder a la documentación de Swagger en:

```bash

$ http://localhost:3000/api

```

- Utiliza la API_KEY proporcionada para las solicitudes autenticadas.

## Pruebas

```bash
# Pruebas unitarias
$ npm run test

# Pruebas e2e
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Estructura del proyecto

```bash
src
├── app.controller.ts
├── app.module.ts
├── main.ts
├── students
│   ├── dto
│   │   ├── create-student.dto.ts
│   │   └── update-student.dto.ts
│   ├── entities
│   │   └── student.entity.ts
│   ├── students.controller.ts
│   ├── students.module.ts
│   ├── students.service.ts
├── health
│   ├── health.controller.ts
│   ├── health.module.ts
│   └── dynamodb.health.ts
├── guards
│   └── api-key
│       ├── api-key.guard.ts
│       └── api-key.guard.spec.ts
test
├── app.e2e-spec.ts
├── health.e2e-spec.ts
└── jest-e2e.json

```

## Contacto

- Author - [Carlos Castillo](https://linkedin.com/in/alfcastillo/)
- Github - [https://github.com/alfcastillo90/](https://github.com/alfcastillo90/)