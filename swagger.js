const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "cse341-backend-jvsu.onrender.com",
  schemes: ["https"]
};

const outputFile = "./swagger-output.json";
const routes = ["./server.js"]; // or index.js or whatever your main Express file is

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
