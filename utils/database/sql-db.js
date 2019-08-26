const mysql = require('mysql');
const config = require('config');

const host = config.get('DB_HOST');
const user = config.get('DB_USERNAME');
const password = config.get('DB_PASSWORD');
const database = config.get('DB_NAME');

// TABLE NAME
const TABLE_NAME = 'contacts';

// COLUMNS TITLES
const COL_FIRST_NAME = 'firstname';
const COL_LAST_NAME = 'lastname';
const COL_AGE = 'age';
const COL_EMAIL = 'email';
const COL_ADDRESS = 'address';
const COL_NUMBER_1 = 'number1';
const COL_NUMBER_2 = 'number2';
const COL_OWNER = 'owner';

const pool = mysql.createPool({
  host,
  user,
  password,
  database,
  // ! NEED TO UNDERSTAND THIS CONNECTION_LIMIT
  connectionLimit: 10,
  port: 3306
});

const createContactsTable = () => {
  return new Promise((resolve, reject) => {
    const sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
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

// const getAllContacts = userId => {
//   return new Promise((resolve, reject) => {
//     const sql = `SELECT * FROM ${TABLE_NAME} WHERE ${COL_OWNER} = ?`;

//     pool.query(sql, userId, (err, result) => {
//       if (err) return reject(err);

//       return resolve(result);
//     });
//   });
// };

// const getContactById = (userId, id) => {
//   return new Promise((resolve, reject) => {
//     const sql = `SELECT * FROM ${TABLE_NAME} WHERE ${COL_OWNER} = ? AND id = ?`;

//     pool.query(sql, [userId, id], (err, result) => {
//       if (err) return reject(err);

//       return resolve(result[0]);
//     });
//   });
// };

// const getContactByName = (userId, txt) => {
//   return new Promise((resolve, reject) => {
//     const sql = `SELECT * FROM ${TABLE_NAME}
//         WHERE ${COL_OWNER} = ? AND ${COL_FIRST_NAME} LIKE '%${txt}%'
//         OR ${COL_OWNER} = ? AND ${COL_LAST_NAME} LIKE '%${txt}%'`;

//     pool.query(sql, [userId, userId], (err, result) => {
//       if (err) return reject(err);

//       return resolve(result);
//     });
//   });
// };

// const insertContact = ({
//   userId,
//   firstname,
//   lastname,
//   age,
//   email,
//   address,
//   number1,
//   number2
// }) => {
//   return new Promise((resolve, reject) => {
//     const sql = `INSERT INTO ${TABLE_NAME} (
//             ${COL_FIRST_NAME},
//             ${COL_LAST_NAME},
//             ${COL_AGE},
//             ${COL_EMAIL},
//             ${COL_ADDRESS},
//             ${COL_NUMBER_1},
//             ${COL_NUMBER_2},
//             ${COL_OWNER}
//             ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)`;

//     pool.query(
//       sql,
//       [firstname, lastname, age, email, address, number1, number2, userId],
//       (err, result) => {
//         if (err) return reject(err);

//         return resolve(result);
//       }
//     );
//   });
// };

// const updateContact = ({
//   userId,
//   id,
//   firstname,
//   lastname,
//   age,
//   email,
//   address,
//   number1,
//   number2
// }) => {
//   return new Promise((resolve, reject) => {
//     const sql = `UPDATE ${TABLE_NAME} SET
//         ${COL_FIRST_NAME} = ?,
//         ${COL_LAST_NAME} = ?,
//         ${COL_AGE} = ?,
//         ${COL_EMAIL} = ?,
//         ${COL_ADDRESS} = ?,
//         ${COL_NUMBER_1} = ?,
//         ${COL_NUMBER_2} = ?
//         WHERE ${COL_OWNER} = ? AND id = ?`;

//     pool.query(
//       sql,
//       [firstname, lastname, age, email, address, number1, number2, userId, id],
//       (err, result) => {
//         if (err) return reject(err);

//         return resolve(result);
//       }
//     );
//   });
// };

// const deleteContact = (userId, id) => {
//   return new Promise((resolve, reject) => {
//     const sql = `DELETE FROM ${TABLE_NAME} WHERE ${COL_OWNER} = ? AND id = ?`;

//     pool.query(sql, [userId, id], (err, result) => {
//       if (err) return reject(err);

//       return resolve(result);
//     });
//   });
// };

// const deleteContacts = (userId, ids) => {
//   return new Promise((resolve, reject) => {
//     // delete from your_table where id in (value1, value2, ...);
//     let marks = '';
//     ids.forEach(id => (marks += ' ?,'));
//     marks = marks.substring(1, marks.length - 1);

//     const sql = `DELETE FROM ${TABLE_NAME} WHERE ${COL_OWNER} = ? AND id in (${marks})`;

//     pool.query(sql, [userId, ...ids], (err, result) => {
//       if (err) return reject(err);

//       return resolve(result);
//     });
//   });
// };

// const deleteAllUserContacts = userId => {
//   return new Promise((resolve, reject) => {
//     const sql = `DELETE FROM ${TABLE_NAME} WHERE ${COL_OWNER} = ?`;

//     pool.query(sql, userId, (err, result) => {
//       if (err) return reject(err);

//       return resolve(result);
//     });
//   });
// };

// const importMultibleContacts = values => {
//   return new Promise((resolve, reject) => {
//     const sql = `INSERT INTO ${TABLE_NAME}
//     (${COL_FIRST_NAME},
//       ${COL_LAST_NAME},
//       ${COL_AGE},
//       ${COL_EMAIL},
//       ${COL_ADDRESS},
//       ${COL_NUMBER_1},
//       ${COL_NUMBER_2},
//       ${COL_OWNER}) VALUES ?`;

//     pool.query(sql, [values], (err, result) => {
//       if (err) return reject(err);

//       return resolve(result);
//     });
//   });
// };

// const importContactsFromFile = fileUrl => {
//   return new Promise((resolve, reject) => {
//     const sql = `LOAD DATA LOCAL INFILE '${fileUrl}'
//         INTO TABLE ${TABLE_NAME}
//         FIELDS TERMINATED BY ','
//         ENCLOSED BY '"'
//         LINES TERMINATED BY '\n'
//         IGNORE 1 ROWS`;

//     pool.query(sql, (err, result) => {
//       if (err) return reject(err);

//       return resolve(result);
//     });
//   });
// };

// const adminGetAllContacts = () => {
//   return new Promise((resolve, reject) => {
//     const sql = `SELECT * FROM ${TABLE_NAME}`;

//     pool.query(sql, (err, result) => {
//       if (err) return reject(err);

//       return resolve(result);
//     });
//   });
// };

// const adminGetContactById = id => {
//   return new Promise((resolve, reject) => {
//     const sql = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;

//     pool.query(sql, id, (err, result) => {
//       if (err) return reject(err);

//       return resolve(result[0]);
//     });
//   });
// };

// const adminGetContactByName = txt => {
//   return new Promise((resolve, reject) => {
//     const sql = `SELECT * FROM ${TABLE_NAME}
//         WHERE ${COL_FIRST_NAME} LIKE '%${txt}%'
//         OR ${COL_LAST_NAME} LIKE '%${txt}%'`;

//     pool.query(sql, (err, result) => {
//       if (err) return reject(err);

//       return resolve(result);
//     });
//   });
// };

// const adminDeleteContact = id => {
//   return new Promise((resolve, reject) => {
//     const sql = `DELETE FROM ${TABLE_NAME} id = ?`;

//     pool.query(sql, id, (err, result) => {
//       if (err) return reject(err);

//       return resolve(result);
//     });
//   });
// };

// const adminGetAllUserContacts = userId => getAllContacts(userId);
// const adminDeleteAllUserContacts = userId => deleteAllUserContacts(userId);

// const adminDropContactsTable = () => {
//   return new Promise((resolve, reject) => {
//     const sql = `DROP TABLE IF EXISTS ${TABLE_NAME}`;

//     pool.query(sql, (err, result) => {
//       if (err) return reject(err);

//       return resolve(result);
//     });
//   });
// };

module.exports = {
  // createContactsTable,
  // getAllContacts,
  // getContactById,
  // getContactByName,
  // insertContact,
  // updateContact,
  // deleteContact,
  // deleteContacts,
  // deleteAllUserContacts,
  // importMultibleContacts,
  // importContactsFromFile,
  // adminGetAllContacts,
  // adminGetContactById,
  // adminGetContactByName,
  // adminDeleteContact,
  // adminGetAllUserContacts,
  // adminDeleteAllUserContacts,
  // adminDropContactsTable
};
