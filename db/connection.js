const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
  if (database) {
    console.log('Database is already initialized!');
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
      database = client.db('project1'); // Always clear and explicit

      console.log('Database connected successfully');
      return callback(null, database);
    })
    .catch((err) => {
      console.error('Database connection failed:', err);
      return callback(err);
    });
}

const getDb = () => {
  if (database) {
    return database;
  }
  throw new Error('Database not initialized. Call initDb first.');
};

module.exports = {
    initDb,
    getDb
};