import express from 'express';

import {
  createProduct,
  deleteProduct,
    getProducts,
} from '../controllers/productController.js';

const router = express.Router();


router.post('/new', createProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/get', getProducts);

export default router;
