const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Kitameraki Technical Test API ',
            version: '1.0.0'
        },
    },
    securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    apis: ['./app/routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs;