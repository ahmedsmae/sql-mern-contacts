const fs = require('fs');
const csv = require('fast-csv');

const {
  importMultibleContacts
} = require('../../database/sql-db/table-contacts/contacts.general');

const createStream = fileName => {
  let stream = fs.createReadStream(`.\\uploads\\${fileName}`);
  let myData = [];
  let csvStream = csv
    .parse()
    .on('data', function(data) {
      myData.push(data);
    })
    .on('end', async function() {
      myData.shift();

      await importMultibleContacts(myData);

      // delete the file from uploads
      fs.unlinkSync(`.\\uploads\\${fileName}`);
    });

  stream.pipe(csvStream);
};

module.exports = createStream;
