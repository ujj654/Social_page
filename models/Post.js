const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  parent: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Parent', 
    required: true 
  },
  circle: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Circle', 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  replies: [
    {
      parentReply: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post' 
      },
      parent: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Parent'
      },
      content: String,
      upvotes: { 
        type: Number, 
        default: 0 
      },
      downvotes: { 
        type: Number, 
        default: 0 
      }
    }
  ],
  upvotes: { 
    type: Number, 
    default: 0 
  },
  downvotes: { 
    type: Number, 
    default: 0 
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
