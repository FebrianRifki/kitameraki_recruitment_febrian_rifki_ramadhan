const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Kitameraki Technical Test API ',
            version: '1.0.0'
        },
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
    apis: ['./app/routes/task_route.js', './app/routes/user_route.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs;