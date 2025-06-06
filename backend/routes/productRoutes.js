import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductByProductId
} from '../controllers/ProductController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to create a new product
router.post('/add', authMiddleware, createProduct);

// Route to get all products
router.get('/all', getAllProducts);

// Route to get product by 6-digit product ID
router.get('/:id', getProductByProductId);

export default router;
