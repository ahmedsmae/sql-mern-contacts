const pool = require('../root-pool');
const { TABLE_NAME, COLUMNS } = require('./contacts.table');

const {
  COL_FIRST_NAME,
  COL_LAST_NAME,
  COL_AGE,
  COL_EMAIL,
  COL_ADDRESS,
  COL_NUMBER_1,
  COL_NUMBER_2,
  COL_OWNER
} = COLUMNS;

const adminGetAllContacts = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${TABLE_NAME}`;

    pool.query(sql, (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

const adminGetContactById = id => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;

    pool.query(sql, id, (err, result) => {
      if (err) return reject(err);

      return resolve(result[0]);
    });
  });
};

const adminGetContactByName = txt => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${TABLE_NAME} 
        WHERE ${COL_FIRST_NAME} LIKE '%${txt}%' 
        OR ${COL_LAST_NAME} LIKE '%${txt}%'`;

    pool.query(sql, (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

const adminDeleteContact = id => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM ${TABLE_NAME} id = ?`;

    pool.query(sql, id, (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

const adminGetAllUserContacts = userId => getAllContacts(userId);
const adminDeleteAllUserContacts = userId => deleteAllUserContacts(userId);

const adminDropContactsTable = () => {
  return new Promise((resolve, reject) => {
    const sql = `DROP TABLE IF EXISTS ${TABLE_NAME}`;

    pool.query(sql, (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

module.exports = {
  adminGetAllContacts,
  adminGetContactById,
  adminGetContactByName,
  adminDeleteContact,
  adminGetAllUserContacts,
  adminDeleteAllUserContacts,
  adminDropContactsTable
};
