const Circle = require('../models/circle');

// Create a new circle
exports.createCircle = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if name and description are provided
    if (!name || !description) {
      return res.status(400).json({ success: false, message: 'Name and description are required' });
    }

    const newCircle = new Circle({ name, description });
    await newCircle.save();

    return res.status(201).json({ success: true, message: 'Circle created successfully', circle: newCircle });
  } catch (error) {
    console.error('Error creating circle:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get all circles
exports.getAllCircles = async (req, res) => {
  try {
    const circles = await Circle.find({});
    return res.status(200).json({ success: true, circles });
  } catch (error) {
    console.error('Error retrieving circles:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
