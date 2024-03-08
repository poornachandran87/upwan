
const express = require('express');
const { newOrder, getSingleOrder, myOrders, orders, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRole } = require('../middlewares/authenticate');

router.route('/order/new').post(isAuthenticatedUser,newOrder);
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);
router.route('/myorders').get(isAuthenticatedUser,myOrders);

//Admin Routes
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRole('admin'), orders)
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRole('admin'), updateOrder)
                        .delete(isAuthenticatedUser, authorizeRole('admin'), deleteOrder)

module.exports = router;