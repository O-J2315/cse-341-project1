const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const bodyParser = require("body-parser");
const app = express();

//Data base
const mongodb = require("./db/connection");
mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(
        `Server is running on port ${port} and Database is connected`,
      );
    });
  }
});

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/", require("./routes"));


// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
