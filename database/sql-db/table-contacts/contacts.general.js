const pool = require('../root-pool');
const { CONTACTS_TABLE_NAME, CONTACTS_COLUMNS } = require('./contacts.table');

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

const getAllContacts = userId => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${CONTACTS_TABLE_NAME} WHERE ${COL_OWNER} = ?`;

    pool.query(sql, userId, (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

const getContactById = (userId, id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${CONTACTS_TABLE_NAME} WHERE ${COL_OWNER} = ? AND id = ?`;

    pool.query(sql, [userId, id], (err, result) => {
      if (err) return reject(err);

      return resolve(result[0]);
    });
  });
};

const getContactByName = (userId, txt) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${CONTACTS_TABLE_NAME} 
        WHERE ${COL_OWNER} = ? AND ${COL_FIRST_NAME} LIKE '%${txt}%' 
        OR ${COL_OWNER} = ? AND ${COL_LAST_NAME} LIKE '%${txt}%'`;

    pool.query(sql, [userId, userId], (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

const insertContact = ({
  userId,
  firstname,
  lastname,
  age,
  email,
  address,
  number1,
  number2
}) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO ${CONTACTS_TABLE_NAME} (
            ${COL_FIRST_NAME}, 
            ${COL_LAST_NAME}, 
            ${COL_AGE}, 
            ${COL_EMAIL}, 
            ${COL_ADDRESS}, 
            ${COL_NUMBER_1}, 
            ${COL_NUMBER_2},
            ${COL_OWNER}
            ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)`;

    pool.query(
      sql,
      [firstname, lastname, age, email, address, number1, number2, userId],
      (err, result) => {
        if (err) return reject(err);

        return resolve(result);
      }
    );
  });
};

const updateContact = ({
  userId,
  id,
  firstname,
  lastname,
  age,
  email,
  address,
  number1,
  number2
}) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE ${CONTACTS_TABLE_NAME} SET 
        ${COL_FIRST_NAME} = ?, 
        ${COL_LAST_NAME} = ?, 
        ${COL_AGE} = ?, 
        ${COL_EMAIL} = ?, 
        ${COL_ADDRESS} = ?, 
        ${COL_NUMBER_1} = ?, 
        ${COL_NUMBER_2} = ? 
        WHERE ${COL_OWNER} = ? AND id = ?`;

    pool.query(
      sql,
      [firstname, lastname, age, email, address, number1, number2, userId, id],
      (err, result) => {
        if (err) return reject(err);

        return resolve(result);
      }
    );
  });
};

const deleteContact = (userId, id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM ${CONTACTS_TABLE_NAME} WHERE ${COL_OWNER} = ? AND id = ?`;

    pool.query(sql, [userId, id], (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

const deleteContacts = (userId, ids) => {
  return new Promise((resolve, reject) => {
    // delete from your_table where id in (value1, value2, ...);
    let marks = '';
    ids.forEach(id => (marks += ' ?,'));
    marks = marks.substring(1, marks.length - 1);

    const sql = `DELETE FROM ${CONTACTS_TABLE_NAME} WHERE ${COL_OWNER} = ? AND id in (${marks})`;

    pool.query(sql, [userId, ...ids], (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

const deleteAllUserContacts = userId => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM ${CONTACTS_TABLE_NAME} WHERE ${COL_OWNER} = ?`;

    pool.query(sql, userId, (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

const importMultibleContacts = values => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO ${CONTACTS_TABLE_NAME} 
    (${COL_FIRST_NAME}, 
      ${COL_LAST_NAME}, 
      ${COL_AGE}, 
      ${COL_EMAIL}, 
      ${COL_ADDRESS}, 
      ${COL_NUMBER_1}, 
      ${COL_NUMBER_2}, 
      ${COL_OWNER}) VALUES ?`;

    pool.query(sql, [values], (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

const importContactsFromFile = fileUrl => {
  return new Promise((resolve, reject) => {
    const sql = `LOAD DATA LOCAL INFILE '${fileUrl}' 
        INTO TABLE ${CONTACTS_TABLE_NAME} 
        FIELDS TERMINATED BY ',' 
        ENCLOSED BY '"' 
        LINES TERMINATED BY '\n' 
        IGNORE 1 ROWS`;

    pool.query(sql, (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });
};

module.exports = {
  getAllContacts,
  getContactById,
  getContactByName,
  insertContact,
  updateContact,
  deleteContact,
  deleteContacts,
  deleteAllUserContacts,
  importMultibleContacts,
  importContactsFromFile
};
