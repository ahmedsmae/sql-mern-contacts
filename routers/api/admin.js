const express = require('express');
const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const auth = require('../../utils/auth');
const {
  adminGetAllContacts,
  adminGetContactById,
  adminGetContactByName,
  adminDeleteContact,
  adminGetAllUserContacts,
  adminDeleteAllUserContacts,
  adminDropContactsTable
} = require('../../database/sql-db/table-contacts/contacts.admin');

// @route    GET api/admin/contacts
// @desc     Get all contacts in contacts table
//@access    Private
router.get('/contacts', auth, async (req, res) => {
  try {
    if (req.user.email === ADMIN_EMAIL) {
      const result = await adminGetAllContacts();
      res.send(result);
    } else {
      throw new Error('Your are not authorized to perform this action');
    }
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route    GET api/admin/contacts/:userId
// @desc     Get all user contacts
//@access    Private
router.get('/contacts/:userId', auth, async (req, res) => {
  try {
    if (req.user.email === ADMIN_EMAIL) {
      const result = await adminGetAllUserContacts(req.params.userId);
      res.send(result);
    } else {
      throw new Error('Your are not authorized to perform this action');
    }
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route    DELETE api/admin/contacts/:userId
// @desc     Delete all user contacts
//@access    Private
router.delete('/contacts/:userId', auth, async (req, res) => {
  try {
    if (req.user.email === ADMIN_EMAIL) {
      const result = await adminDeleteAllUserContacts(req.params.userId);
      res.send(result);
    } else {
      throw new Error('Your are not authorized to perform this action');
    }
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route    GET api/admin/contact/:id
// @desc     Get contact by its id
//@access    Private
router.get('/contact/:id', auth, async (req, res) => {
  try {
    if (req.user.email === ADMIN_EMAIL) {
      const result = await adminGetContactById(req.params.id);
      res.send(result);
    } else {
      throw new Error('Your are not authorized to perform this action');
    }
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route    GET api/admin/contact/name/:txt
// @desc     Get contact by its name
//@access    Private
router.get('/contact/name/:txt', auth, async (req, res) => {
  try {
    if (req.user.email === ADMIN_EMAIL) {
      const result = await adminGetContactByName(req.params.txt);
      res.send(result);
    } else {
      throw new Error('Your are not authorized to perform this action');
    }
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route    DELETE api/admin/contact/:id
// @desc     Delete contact by its id
//@access    Private
router.delete('/contact/:id', auth, async (req, res) => {
  try {
    if (req.user.email === ADMIN_EMAIL) {
      const result = await adminDeleteContact(req.params.id);
      res.send(result);
    } else {
      throw new Error('Your are not authorized to perform this action');
    }
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route    DELETE api/admin/dropcontactstable
// @desc     Drop the whole contacts table
//@access    Private
router.delete('/dropcontactstable', auth, async (req, res) => {
  try {
    if (req.user.email === ADMIN_EMAIL) {
      const result = await adminDropContactsTable();
      res.send(result);
    } else {
      throw new Error('Your are not authorized to perform this action');
    }
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

module.exports = router;
