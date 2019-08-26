// import all createTable methods
const { createContactsTable } = require('./contacts/contacts.table');

// to be exported to server.js
const createTables = () => {
  createContactsTable();
};

module.exports = createTables;
