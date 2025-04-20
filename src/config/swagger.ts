import { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Ejemplo',
      version: '1.0.0',
      description: 'Documentación de la API para el backend',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Cambia esto según tu entorno
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Ruta a tus archivos de rutas donde defines los endpoints
};
