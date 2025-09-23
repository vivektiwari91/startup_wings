const express = require('express');
const { submitContact, getContacts, getContactById, updateContactStatus } = require('../controllers/contact');
const { verifyToken, isAdmin } = require('../middlewares/authmiddlewares');
const { validateContact } = require('../middlewares/contactmiddlewares');

const router = express.Router();

// Public route - submit contact form
router.post('/submit', validateContact, submitContact);

// Protected routes - admin only
router.get('/all', verifyToken, isAdmin, getContacts);
router.get('/:id', verifyToken, isAdmin, getContactById);
router.put('/:id/status', verifyToken, isAdmin, updateContactStatus);

module.exports = router;