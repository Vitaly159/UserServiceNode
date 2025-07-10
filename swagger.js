import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version: '1.0.0',
        },
    },
    apis: ['./src/controllers/*.ts'], // укажите путь к вашим контроллерам с комментариями
};

const swaggerSpec = swaggerJsdoc(options);

// экспортируйте или сохраняйте в файл
export default swaggerSpec;