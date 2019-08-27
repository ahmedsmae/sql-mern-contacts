const pool = require('../root-pool');

// TABLE NAME
const CONTACTS_TABLE_NAME = 'contacts';

// COLUMNS TITLES
const CONTACTS_COLUMNS = {
  COL_FIRST_NAME: 'firstname',
  COL_LAST_NAME: 'lastname',
  COL_AGE: 'age',
  COL_EMAIL: 'email',
  COL_ADDRESS: 'address',
  COL_NUMBER_1: 'number1',
  COL_NUMBER_2: 'number2',
  COL_OWNER: 'owner'
};

const {
  COL_FIRST_NAME,
  COL_LAST_NAME,
  COL_AGE,
  COL_EMAIL,
  COL_ADDRESS,
  COL_NUMBER_1,
  COL_NUMBER_2,
  COL_OWNER
} = CONTACTS_COLUMNS;

const createContactsTable = () => {
  return new Promise((resolve, reject) => {
    const sql = `CREATE TABLE IF NOT EXISTS ${CONTACTS_TABLE_NAME} (
            id INT AUTO_INCREMENT PRIMARY KEY, 
            ${COL_FIRST_NAME} VARCHAR(255), 
            ${COL_LAST_NAME} VARCHAR(255), 
            ${COL_AGE} INT, 
            ${COL_EMAIL} VARCHAR(255), 
            ${COL_ADDRESS} VARCHAR(255), 
            ${COL_NUMBER_1} VARCHAR(255), 
            ${COL_NUMBER_2} VARCHAR(255),
            ${COL_OWNER} VARCHAR(255)
            )`;

    pool.query(sql, (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

module.exports = {
  CONTACTS_TABLE_NAME,
  CONTACTS_COLUMNS,
  createContactsTable
};
