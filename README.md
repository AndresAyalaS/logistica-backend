# TypeScript Express PostgreSQL Project

Este proyecto es una aplicación web construida con TypeScript, Express y PostgreSQL. Implementa autenticación utilizando JSON Web Tokens (JWT) y proporciona documentación de la API a través de Swagger.

## Estructura del Proyecto

```
typescript-express-postgresql
├── src
│   ├── app.ts                  # Punto de entrada de la aplicación
│   ├── config
│   │   └── database.ts         # Configuración de la base de datos PostgreSQL
│   ├── controllers
│   │   └── authController.ts    # Controlador para la autenticación de usuarios
│   ├── middlewares
│   │   └── authMiddleware.ts     # Middleware para verificar el token JWT
│   ├── models
│   │   └── userModel.ts         # Modelo de usuario
│   ├── routes
│   │   ├── authRoutes.ts        # Rutas relacionadas con la autenticación
│   │   └── index.ts             # Rutas principales de la aplicación
│   ├── services
│   │   └── authService.ts       # Lógica de negocio para la autenticación
│   ├── types
│   │   └── index.ts             # Definición de tipos e interfaces
│   └── utils
│       └── jwtUtils.ts          # Utilidades para la creación y verificación de tokens JWT
├── swagger
│   └── swagger.json             # Documentación de la API en formato Swagger
├── package.json                 # Configuración de npm y dependencias
├── tsconfig.json                # Configuración de TypeScript
└── README.md                    # Documentación del proyecto
```

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   cd typescript-express-postgresql
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura la base de datos en `src/config/database.ts`.

4. Compila el proyecto:
   ```
   npm run build
   ```

5. Ejecuta la aplicación:
   ```
   npm start
   ```

## Uso

- Regístrate un nuevo usuario enviando una solicitud POST a `/auth/register`.
- Inicia sesión enviando una solicitud POST a `/auth/login`.
- Protege tus rutas utilizando el middleware `verifyToken`.

## Documentación de la API

La documentación de la API está disponible en `swagger/swagger.json`. Puedes utilizar herramientas como Swagger UI para visualizarla de manera interactiva.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.