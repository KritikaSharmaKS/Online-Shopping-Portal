const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

const auth = require('../middleware/is-Auth');
const { body } = require('express-validator');

// /admin/add-product => GET
router.get('/add-product', auth, adminController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product',  [
    body("title").isString().isLength({min: 5}),
    body('price').isFloat(),
    body('description').trim().isLength({min: 5, max: 400})
], auth, adminController.postAddProduct);

// /admin/products => GET
router.get('/products', auth, adminController.getProducts);

router.get('/edit-product/:productId', auth, adminController.getEditProduct);

router.post('/edit-product/', auth, [
    body("title").isString().isLength({min: 5}),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description').trim().isLength({min: 5, max: 400})
], adminController.postEditProduct);

router.post('/delete-product/', auth, adminController.postDeleteProduct);

module.exports = router;
