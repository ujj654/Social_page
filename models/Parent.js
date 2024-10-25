const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ParentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  school: { 
    type: String, 
    required: true 
  },
  grade: { 
    type: String, 
    required: true 
  },
  section: { 
    type: String, 
    required: true 
  },
  society: { 
    type: String 
  },
  circles: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Circle' 
  }]
});

// Password hashing
ParentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Parent', ParentSchema);
