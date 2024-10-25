const express = require('express');
const router = express.Router();
const circleController = require('../controllers/circleController');
const auth = require('../middleware/authMiddleware');

// Route to create a new circle
router.post('/', auth, circleController.createCircle);

// Route to get all circles
router.get('/', auth, circleController.getAllCircles);

module.exports = router;
