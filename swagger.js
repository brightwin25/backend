const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Money tracker application",
            version: "1.0.0",
            description: "API documentation using Swagger",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    url: [path.join(__dirname, "routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;