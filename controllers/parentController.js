const Parent = require('../models/Parent');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const circleUtils = require('../utils/circleUtils');

// Register a parent
exports.registerParent = async (req, res) => {
  const { name, email, password, school, grade, section, society } = req.body;

  try {
    let parent = await Parent.findOne({ email });

    if (parent) {
      return res.status(400).json({ message: 'Parent already exists' });
    }

    parent = new Parent({
      name,
      email,
      password,
      school,
      grade,
      section,
      society,
    });

    // Save the parent
    await parent.save();

    const circles = await circleUtils.createAutoJoinedCircles(parent);
    parent.circles = circles.map(circle => circle._id);
    await parent.save();

    // Generate JWT token
    const token = jwt.sign({ id: parent._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error registering parent:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login a parent
exports.loginParent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const parent = await Parent.findOne({ email });

    if (!parent) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, parent.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: parent._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in parent:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get parent profile
exports.getParentProfile = async (req, res) => {
  try {
    const parent = await Parent.findById(req.parent.id).select('-password');
    res.json(parent);
  } catch (error) {
    console.error('Error retrieving parent profile:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
