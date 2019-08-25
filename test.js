const contactsArray = [
  {
    id: 1,
    firstname: 'Ahmed',
    lastname: 'Afifi',
    age: 32
  },
  {
    id: 2,
    firstname: 'Mohamed',
    lastname: 'Samir',
    age: 33
  },
  {
    id: 3,
    firstname: 'Moustafa',
    lastname: 'Mohsen',
    age: 30
  }
];

// ? CONVERT ARRAY TO OBJECT BASED ON ITS ID
const normalizeArray = (array, OBJECT_TYPE) => {
  let resultObject = {};
  for (const obj of array) {
    resultObject[`${OBJECT_TYPE}_${obj.id}`] = obj;
  }
  return resultObject;
};

// ? ANOTHER GREAT WAY TO CONVERT ARRAY TO OBJECT
const normalizeArray2 = (array, OBJECT_TYPE) =>
  array.reduce((accumulator, obj) => {
    accumulator[`${OBJECT_TYPE}_${obj.id}`] = obj;
    return accumulator;
  }, {});

// const result = normalizeArray(contactsArray, 'USER');
const result = normalizeArray2(contactsArray, 'CONTACT');
console.log(result);

// ? LOOPING INTO AN OBJECT'S PROPERTIES
for (const prop in result) {
  // result.hasOwnProperty(prop) &&
  console.log(result[prop]);

  // if (result.hasOwnProperty(prop)) {
  //   console.log(result[prop]);
  // }
}
