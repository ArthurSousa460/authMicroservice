import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Microservice Auth API',
      version: '1.0.0',
      description: 'API de autenticação e gerenciamento de usuários',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'ID do usuário' },
            name: { type: 'string', description: 'Nome do usuário' },
            email: { type: 'string', format: 'email', description: 'Email do usuário' },
            role: { type: 'string', enum: ['ADMIN', 'USER'], description: 'Papel do usuário' }
          }
        },
        UserLogin: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string', enum: ['ADMIN', 'USER'] },
            token: { type: 'string', description: 'Token JWT' }
          }
        },
        AuthSchema: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' }
          },
          required: ['email', 'password']
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', description: 'Mensagem de erro' }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: [
    './src/swagger/routes.yaml'
  ]
};

const specs = swaggerJsdoc(options);
export default specs; 