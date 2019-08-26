const express = require('express');
const path = require('path');

const connectMongoDB = require('./utils/database/mongo-db');
const createTables = require('./utils/database/sql-db/create-tables');
// const { createContactsTable } = require('./utils/database/sql-db');

const app = express();

// connect to the users mongo db
connectMongoDB();

// build contacts table if not exists
createTables();

// Init Middleware
app.use(express.json({ extended: false }));

// @route   GET /
// @desc    test
app.get('/', (req, res) => {
  res.json('Test SQL App');
});

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
