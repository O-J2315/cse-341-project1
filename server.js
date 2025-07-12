const express = require("express");
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

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use("/", require("./routes"));




