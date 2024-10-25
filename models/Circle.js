const mongoose = require('mongoose');

const circleSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
}, 
  description: { 
    type: String, 
    required: true 
},
  createdAt: { 
    type: Date, 
    default: Date.now 
}
});

const Circle = mongoose.models.Circle || mongoose.model('Circle', circleSchema);

module.exports = Circle;
