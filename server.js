const express = require('express');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const connectMongoDB = require('./database/mongo-db');
const createSqlDB = require('./database/sql-db/create-db');

const app = express();

// connect to the users mongo db
connectMongoDB();

// build contacts table if not exists
createSqlDB();

// Init Middleware
app.use(compression()); // for gzipping on heruko
app.use(express.json({ extended: false }));
// inforce HTTPS for security
app.use(enforce.HTTPS({ trustProtoHeader: true }));

// Define Routers
app.use('/api/users', require('./routers/api/users'));
app.use('/api/contacts', require('./routers/api/contacts'));
app.use('/api/admin', require('./routers/api/admin'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('/service-worker.js', (req, res) => {
  res.send(path.resolve(__dirname, '..', 'build', 'serbice-worker.js'));
});

// dev port saved on .env
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
