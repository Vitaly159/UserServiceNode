import fs from 'fs';
import yaml from 'js-yaml';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
    },
  },
  apis: ['./src/controllers/*.ts'], // путь к вашим файлам с комментариями
};

const swaggerSpec = swaggerJsdoc(options);

// Записываем в файл
fs.writeFileSync('./swagger.yaml', yaml.dump(swaggerSpec));

console.log('Swagger YAML успешно сгенерирован');