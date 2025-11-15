// Backend/routes/routes/userRoutes.js
/*import express from 'express';
import { getUserProfile, updateUser } from '../../Controllers/authController.js';
import { protect } from '../../Middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, updateUser);

export default router;*/
import express from 'express';
import { getUserProfile, updateUser } from '../Controllers/authController.js';
import { protect } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, updateUser);

export default router;

