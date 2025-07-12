const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-output.json");

// Serve Swagger API documentation
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
