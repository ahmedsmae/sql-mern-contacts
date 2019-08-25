const { Parser } = require('json2csv');

const parseJson2csv = jsonContacts => {
  // create headers
  const fields = Object.keys(jsonContacts[0]);

  const json2csvParser = new Parser({ fields });

  // convert the array to csv
  return json2csvParser.parse(jsonContacts);
};

module.exports = parseJson2csv;
