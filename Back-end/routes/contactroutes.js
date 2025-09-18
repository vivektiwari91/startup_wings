const express = require('express');
const {
  createContact,
  getAllContacts,
  getContact,
  updateContact,
  deleteContact,
  getContactStats
} = require('../controllers/contact');
const { protect, authorize } = require('../middlewares/authmiddlewares');

const router = express.Router();

// Public routes - Allow both authenticated and anonymous users
router.post('/', createContact);

// Protected routes (Admin only)
router.get('/', protect, authorize('admin'), getAllContacts);
router.get('/stats', protect, authorize('admin'), getContactStats);
router.get('/:id', protect, authorize('admin'), getContact);
router.put('/:id', protect, authorize('admin'), updateContact);
router.delete('/:id', protect, authorize('admin'), deleteContact);

module.exports = router;