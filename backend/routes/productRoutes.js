import express from 'express';
import {
  addProduct,
  getAllProducts,
  getProductByProductId,
  getProductByUser,
  getPurchasedProducts,
  getSellingProducts,
  deleteProduct,
  updateProduct
} from '../controllers/ProductController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import upload from '../utils/multer.js'

const router = express.Router();

// Route to create a new product
router.post('/add', authMiddleware, upload.array('images'), addProduct);

// Route to get all products
router.get('/all', getAllProducts);

//Route to get product by userId
router.get('/user', authMiddleware, getProductByUser);

//Route to get product Buy by user
router.get('/purchased', authMiddleware, getPurchasedProducts);

//Route to get product Selling by user
router.get('/selling', authMiddleware, getSellingProducts);

//Route to get product Orders by user
router.delete('/delete/:id', authMiddleware, deleteProduct);


// Route to get product by 6-digit product ID
router.get('/:id', getProductByProductId);

router.put('/:id', updateProduct)


export default router;
