const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const auth = require('../../utils/auth');
const {
  getAllContacts,
  getContactById,
  getContactByName,
  insertContact,
  updateContact,
  deleteContact,
  deleteContacts
} = require('../../database/sql-db/table-contacts/contacts.general');

const {
  adminGetAllContacts
} = require('../../database/sql-db/table-contacts/contacts.admin');

const parseJson2csv = require('../../utils/csv/csv-parser');
const createStream = require('../../utils/csv/csv-stream');
const upload = require('../../utils/upload');

// @route    GET api/contacts
// @desc     Get all contacts
//@access    Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await getAllContacts(req.user.id);

    res.send(contacts);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route    GET api/contacts/:id
// @desc     Get contact by it's id
//@access    Private
router.get('/:id', auth, async (req, res) => {
  try {
    const contact = await getContactById(req.user.id, req.params.id);

    res.send(contact);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route    GET api/contacts/name/:txt
// @desc     Get contacts by it's name
//@access    Private
router.get('/name/:txt', auth, async (req, res) => {
  try {
    const contacts = await getContactByName(req.user.id, req.params.txt);

    res.send(contacts);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route    POST api/contacts
// @desc     Create contact
//@access    Private
router.post(
  '/',
  [
    auth,
    [
      check('firstname', 'First and Last names are required')
        .not()
        .isEmpty(),
      check('lastname', 'First and Last names are required')
        .not()
        .isEmpty(),
      check('number1', 'Contact Number is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const result = await insertContact({
        userId: req.user.id,
        ...req.body
      });

      res.send(result);
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  }
);

// @route    UPDATE api/contacts/:id
// @desc     Update contact by it's id
//@access    Private
router.patch(
  '/:id',
  [
    auth,
    [
      check('firstname', 'First and Last names are required')
        .not()
        .isEmpty(),
      check('lastname', 'First and Last names are required')
        .not()
        .isEmpty(),
      check('number1', 'Contact Number is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const result = await updateContact({
        userId: req.user.id,
        id: req.params.id,
        ...req.body
      });

      res.send(result);
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  }
);

// @route    DELETE api/contacts/:id
// @desc     Delete contact by it's id
//@access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await deleteContact(req.user.id, req.params.id);

    res.send(result);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route    DELETE api/contacts
// @desc     Delete contacts
//@access    Private
router.delete('/', auth, async (req, res) => {
  try {
    const result = await deleteContacts(req.user.id, req.body.contacts);

    res.send(result);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route    POST api/contacts/import-from-csv
// @desc     Import contacts from CSV file
//@access    Private
router.post(
  '/import-from-csv',
  auth,
  upload.single('csvfile'),
  async (req, res) => {
    try {
      const result = await createStream(req.file.filename);

      // This code will be faster but could be applied only with PAIED SQL VERSION
      // const result = await importContactsFromFile(`uploads\\${req.file.filename}`);

      res.send(result);
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  }
);

// @route    GET api/contacts/export/all-to-csv
// @desc     Export all contacts to CSV file
//@access    Private
router.get('/export/all-to-csv', auth, async (req, res) => {
  try {
    let contacts = await adminGetAllContacts();

    const csv = parseJson2csv(contacts);

    res.send(csv);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

module.exports = router;
