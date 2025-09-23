const express = require('express');
const { register, login, getProfile, updateProfile } = require('../controllers/auth');
const { verifyToken } = require('../middlewares/authmiddlewares');
const { validateRegister, validateLogin } = require('../middlewares/authmiddlewares');

const router = express.Router();

// Public routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Protected routes
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

// Token verification endpoint
router.get('/verify', verifyToken, (req, res) => {
  res.json({ 
    valid: true, 
    user: {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name
    }
  });
});

module.exports = router;