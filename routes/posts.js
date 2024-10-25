const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');



// Create a new post
router.post('/', auth, postController.createPost);  

// Reply to a post
router.post('/:postId/reply', auth, postController.replyToPost); 

// Upvote a post
router.post('/:postId/upvote', auth, postController.upvotePost); 

module.exports = router;
