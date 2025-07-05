const express = require('express');
const app = express();

//Data base 
const mongodb = require("./db/connection")

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    
  app.listen(port, () => {
    console.log(`Server is running on port ${port} and Database is connected`); });
    }
});


const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

const contactsRoutes = require('./routes/contacts');
app.use('/contacts', contactsRoutes); // ✅ must be mounted at /contacts