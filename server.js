const express = require('express');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');

// ! SHOULD RUN AS EARLY AS POSSIBLE IN THE APP
// in case of production > heroku will store his own environment variables
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();

const connectMongoDB = require('./database/mongo-db');
const createSqlDB = require('./database/sql-db/create-db');

// create and connect databases
connectMongoDB();
createSqlDB();

// Init Middleware
app.use(compression()); // for gzipping (compression) on heruko
app.use(express.json({ extended: false }));

// Define Routers
app.use('/api/users', require('./routers/api/users'));
app.use('/api/contacts', require('./routers/api/contacts'));
app.use('/api/admin', require('./routers/api/admin'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.use(enforce.HTTPS({ trustProtoHeader: true })); // inforce HTTPS for security

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// serve the service worker from the build version whenever asked for it
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

// dev port saved on .env
app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
