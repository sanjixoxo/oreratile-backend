// Backend/Controllers/postController.js
/*import BlogPost from '../Models/BlogPost.js';

export const getAllPosts = async (req, res) => {
  const posts = await BlogPost.find().populate('author', 'username');
  res.json(posts);
};

export const getSinglePost = async (req, res) => {
  const post = await BlogPost.findById(req.params.id).populate('author', 'username');
  res.json(post);
};

export const createPost = async (req, res) => {
  const { title, subtitle, content, imageUrl } = req.body;
  const post = new BlogPost({
    title,
    subtitle,
    content,
    imageUrl,
    author: req.user.id,
  });
  await post.save();
  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(post);
};

export const deletePost = async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
}; */

/*import BlogPost from '../Models/BlogPost.js';

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single post
export const getSinglePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a post
export const createPost = async (req, res) => {
  try {
    const { title, subtitle, content, imageUrl } = req.body;
    const post = new BlogPost({
      title,
      subtitle,
      content,
      imageUrl,
      author: req.user.id,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};*/
import BlogPost from '../Models/BlogPost.js';
import User from '../Models/users.js';

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .populate('authorId', 'username')
      .sort({ createdAt: -1 });
    
    // Format response to match frontend expectations
    const formattedPosts = posts.map(post => ({
      id: post._id,
      title: post.title,
      subtitle: post.subtitle,
      content: post.content,
      image: post.image,
      authorId: post.authorId._id,
      authorName: post.authorName,
      createdAt: post.createdAt
    }));

    res.json(formattedPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single post
export const getSinglePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('authorId', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    res.json({
      id: post._id,
      title: post.title,
      subtitle: post.subtitle,
      content: post.content,
      image: post.image,
      authorId: post.authorId._id,
      authorName: post.authorName,
      createdAt: post.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a post (with file upload support)
export const createPost = async (req, res) => {
  try {
    const { title, subtitle, content, authorId } = req.body;
    
    // Get author name
    const user = await User.findById(authorId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle image upload
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const post = new BlogPost({
      title,
      subtitle,
      content,
      image: imagePath,
      authorId,
      authorName: user.username,
    });

    await post.save();
    
    res.status(201).json({
      id: post._id,
      title: post.title,
      subtitle: post.subtitle,
      content: post.content,
      image: post.image,
      authorId: post.authorId,
      authorName: post.authorName,
      createdAt: post.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const { title, subtitle, content, authorId } = req.body;
    
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Verify ownership
    if (post.authorId.toString() !== authorId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update fields
    if (title) post.title = title;
    if (subtitle !== undefined) post.subtitle = subtitle;
    if (content) post.content = content;
    
    // Handle new image upload
    if (req.file) {
      post.image = `/uploads/${req.file.filename}`;
    }

    await post.save();
    
    res.json({
      id: post._id,
      title: post.title,
      subtitle: post.subtitle,
      content: post.content,
      image: post.image,
      authorId: post.authorId,
      authorName: post.authorName,
      createdAt: post.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { authorId } = req.body;
    
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Verify ownership
    if (post.authorId.toString() !== authorId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

