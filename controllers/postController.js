const Post = require('../models/post');
const Circle = require('../models/circle');

// Create post
exports.createPost = async (req, res) => {
  try {
    const { content, circle } = req.body;
    const parentId = req.parent.id;

    if (!content || !circle) {
      return res.status(400).json({ message: 'Content and circle are required' });
    }

    // Check if the circle exists
    const foundCircle = await Circle.findById(circle);
    if (!foundCircle) {
      return res.status(404).json({ message: 'Circle not found' });
    }

    // Create a new post
    const newPost = new Post({
      parent: parentId,
      circle,
      content
    });

    await newPost.save();
    return res.status(201).json({ message: 'Post created successfully', post: newPost });

  } catch (error) {
    console.error('Error creating post:', error.message);
    return res.status(500).json({ message: 'Error creating post' });
  }
};

// Reply to a post
exports.replyToPost = async (req, res) => {
  try {
    const { content } = req.body;
    const parentId = req.parent.id;
    const { postId } = req.params;

    if (!content) {
      return res.status(400).json({ message: 'Reply content is required' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Add reply to the post
    post.replies.push({
      parentReply: postId,
      content,
      parent: parentId
    });

    await post.save();
    return res.status(201).json({ message: 'Reply added successfully', post });

  } catch (error) {
    console.error('Error replying to post:', error.message);
    return res.status(500).json({ message: 'Error replying to post' });
  }
};

// Upvote a post
exports.upvotePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment upvote count
    post.upvotes += 1;

    await post.save();
    return res.status(200).json({ message: 'Post upvoted successfully', post });

  } catch (error) {
    console.error('Error upvoting post:', error.message);
    return res.status(500).json({ message: 'Error upvoting post' });
  }
};
