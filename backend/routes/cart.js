
const express = require('express');

const router = express.Router();
const {isAuthenticatedUser } = require('../middlewares/authenticate');
const { cartAdd, cartPlus, cartMinus, cartDelete, getCartItems, cartAllDelete } = require('../controllers/cartController');

router.route('/cart/add').put(isAuthenticatedUser,cartAdd);
router.route('/cart/plus').put(isAuthenticatedUser,cartPlus)
router.route('/cart/minus').put(isAuthenticatedUser,cartMinus)
router.route('/cart/delete').put(isAuthenticatedUser,cartDelete)
router.route('/cart/deleteall').put(isAuthenticatedUser,cartAllDelete)
router.route('/cartitems').get(isAuthenticatedUser,getCartItems)
module.exports = router;