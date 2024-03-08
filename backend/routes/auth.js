const express = require('express');
const { 
    registerUser ,
    loginUser, 
    logoutUser, 
    forgotPassword, 
    resetPassword,
    changePassword,
    getUserProfile, 
    updateProfile,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/authController');
const { isAuthenticatedUser, authorizeRole } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').post(resetPassword)
router.route('/password/change').put(isAuthenticatedUser,changePassword)
router.route('/myprofile').get(isAuthenticatedUser,getUserProfile)
router.route('/update').put(isAuthenticatedUser,updateProfile)

//admin routes

router.route('/admin/users').get(isAuthenticatedUser,authorizeRole('admin'),getAllUsers)
router.route('/admin/user/:id')
                                .get(isAuthenticatedUser,authorizeRole('admin'),getUser)
                                .put(isAuthenticatedUser,authorizeRole('admin'),updateUser)
                                .delete(isAuthenticatedUser,authorizeRole('admin'),deleteUser)

module.exports = router;