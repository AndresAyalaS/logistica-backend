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
      schemas: {
        // Esquema Shipment
        Shipment: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            user_id: {
              type: 'integer',
            },
            weight: {
              type: 'number',
              format: 'float',
            },
            dimensions: {
              type: 'object',
            },
            product_type: {
              type: 'string',
            },
            origin_address: {
              type: 'string',
            },
            destination_address: {
              type: 'string',
            },
            status: {
              type: 'string',
            },
            route_id: {
              type: 'integer',
              nullable: true,  // Si la ruta es null
            },
            carrier_id: {
              type: 'integer',
              nullable: true,  // Si el transportista es null
            },
            tracking_number: {
              type: 'string',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
            },
          },
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
