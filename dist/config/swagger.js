"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
exports.swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Ejemplo',
            version: '1.0.0',
            description: 'Documentación de la API para el backend',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/**/*.ts', './src/controllers/**/*.ts'], // Ruta a tus archivos de rutas donde defines los endpoints
};
