const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview, getAdminProducts, getCategory, suggestPlant } = require('../controllers/productController');
const router = express.Router();
const { isAuthenticatedUser,authorizeRole } = require('../middlewares/authenticate')
const multer = require('multer');
const path = require('path')

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname, '..\\uploads\\product' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })

router.route('/products').get(getProducts)
//router.route('/products').get(isAuthenticatedUser,getProducts)

router.route('/product/:id').get(getSingleProduct)
                    
                            

router.route('/review').put(isAuthenticatedUser, createReview)
router.route('/category').get(getCategory)
router.route('/suggestPlant').post(suggestPlant)


//admin routes
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRole('admin'),upload.array('images'),newProduct)
router.route('/admin/products').get(isAuthenticatedUser, authorizeRole('admin'), getAdminProducts);
router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRole('admin'), deleteProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRole('admin'),upload.array('images'), updateProduct);
router.route('/admin/reviews').get(isAuthenticatedUser, authorizeRole('admin'),getReviews)
router.route('/admin/review').delete(isAuthenticatedUser, authorizeRole('admin'),deleteReview)

module.exports = router;