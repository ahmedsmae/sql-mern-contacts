export const unselectContactsByIds = (
  originalContacts,
  contactsToBeUnselected
) => {
  // originalContacts > array of contact object
  // contactsToBeRemoved > array of ids
  return originalContacts.filter(
    ({ id }) => !contactsToBeUnselected.includes(id)
  );
};

export const csvFromContactsArray = contacts => {
  const csvRows = [];

  // get the headers
  const headers = Object.keys(contacts[0]);
  csvRows.push(headers.join(','));

  // loop over the rows
  for (const contact of contacts) {
    const contactValues = headers.map(header => {
      // replace " with \"
      const escaped = ('' + contact[header]).replace('"', '\\"');
      // set "" around it to contain commas if present
      return `"${escaped}"`;
    });

    csvRows.push(contactValues.join(','));
  }

  const finalCsv = csvRows.join('\n');

  // create a download blob
  const blob = new Blob([finalCsv], { type: 'text/csv' });

  return window.URL.createObjectURL(blob);
};
