const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const sendMail = require('../utils/email');
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require('../utils/jwt');
const crypto = require('crypto');

//Register User - /api/v1/register

exports.registerUser = catchAsyncError(async (req,res,next) => {
    const {name,email,password,avatar} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar
    });

    
    sendToken(user,201,res)

   
});


//Login User - /api/v1/login
exports.loginUser = async (req,res,next) => {
    const {email,password} = req.body
    
    if(!email || !password){
        return next(new ErrorHandler('please enter email & password' , 400))

    }
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('invalid  email or password' , 401));

    }
    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler('invalid  email or password' , 401));
    }

    sendToken(user,201,res);

};


//Logout - /api/v1/logout
exports.logoutUser = (req,res,next) => {
        res.cookie('token',null,{
            expires:new Date(Date.now()),
            httpOnly: true
        })
        .status(200)
        .json({
            succes:true,
            message:'Loggedout'
        })

}

//Forgot Password - /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req,res,next) =>{
    const user =await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler('User not found with this email',404))
    }

    const resetToken = user.getResetToken();
    await user.save({validateBeforeSave : false})
    let BASE_URL = process.env.FRONTEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }


    //Create reset url
    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`;
    // const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message =`Your password reset token is follows \n\n
    ${resetUrl} \n\n  If you have not requested, please ignore it.`


    try{

        sendMail({
            email:user.email,
            subject:'Password recovery',
            message
        })

        res.status(200).json({
            success:true,
            message:`email sent to ${user.email}`
        })
    }catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(err.message,500))
    }
})

//Reset Password - /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError( async(req,res,next) =>{
  

    const resetPasswordToken =await crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne( {
        resetPasswordToken,
        resetPasswordTokenExpire: {
            $gt : Date.now()
        }
    } )

    if(!user) {
        return next(new ErrorHandler('Password reset token is invalid or expired'));
    }
    if(!req.body.password){
        return next(new ErrorHandler('Please Enter Password'))
    }

    if( req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match'));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave: false})
    sendToken(user, 201, res)
})

//Change Password  - api/v1/password/change
exports.changePassword = catchAsyncError(async (req,res,next) =>{
    const user = await User.findById(req.user.id).select('+password')

    if(! await user.isValidPassword(req.body.oldPassword)){
        return next(new ErrorHandler('Old password is incorrect'),401)
    }

    user.password = req.body.password;
    await user.save();
    res.status(200).json({
        success:true
    })
    
})

//Get User Profile - /api/v1/myprofile
exports.getUserProfile = catchAsyncError(async (req,res,next) =>{
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })

});


//Update Profile - /api/v1/update
exports.updateProfile= catchAsyncError(async (req,res,next) =>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        user
    })

});



//Admin: Get All Users - /api/v1/admin/users

exports.getAllUsers = catchAsyncError(async(req,res,next) => {
    const users = await User.find()
    res.status(200).json({
        success:true,
        users
    })
})


//Admin: Get Specific User - api/v1/admin/user/:id
exports.getUser = catchAsyncError(async(req,res,next) => {
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`user not found with this id: ${req.body.params}`,404))
    }
    res.status(200).json({
        success:true,
        user
    })
})

//Admin: Update User - api/v1/admin/user/:id
exports.updateUser= catchAsyncError(async (req,res,next) =>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        user
    })

});

//Admin: Delete User - api/v1/admin/user/:id
exports.deleteUser = catchAsyncError(async(req,res,next) => {
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`user not found with this id: ${req.body.params}`,404))
    }

    await user.deleteOne();
    res.status(200).json({
        success:true
    })
})
