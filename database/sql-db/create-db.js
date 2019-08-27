// import all createTable methods
const { createContactsTable } = require('./table-contacts/contacts.table');

// import all createView methods

// import all createTrigger methods

// to be exported to server.js
const createDB = () => {
  // invoke all createTable, createView, createTrigger methods
  createContactsTable();
};

module.exports = createDB;
