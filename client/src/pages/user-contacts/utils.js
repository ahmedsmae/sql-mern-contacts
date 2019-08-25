export const messageArgs = {
  title: 'Delete contacts confirmation',
  message: `This will delete permenently all selected contacts. Are you sure ?`,
  confirm: 'Delete',
  cancel: 'Cancel'
};

export const downloadCsv = href => {
  // create a link to download the generated url
  const a = document.createElement('a');
  a.setAttribute('hidden', true);
  a.setAttribute('href', href);
  a.setAttribute('download', 'contacts.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
