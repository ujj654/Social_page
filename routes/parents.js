const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');
const auth = require('../middleware/authMiddleware');

// Parent registration
router.post('/register', parentController.registerParent);

// Parent login
router.post('/login', parentController.loginParent);

// Get parent profile
router.get('/profile', auth, parentController.getParentProfile);

module.exports = router;
