import express from 'express';
import upload from '../Middleware/uploadMiddleware.js';
import {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
} from '../Controllers/postController.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getSinglePost);
router.post('/', upload.single('image'), createPost); // FIXED: added upload
router.put('/:id', upload.single('image'), updatePost); // FIXED: added upload
router.delete('/:id', deletePost);

export default router;

