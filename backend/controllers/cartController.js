const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError')
const User = require('../models/userModel');
exports.cartAdd = catchAsyncError (async (req,res) => {
    //req.body.user = req.user.id
    const user = await User.findOne({email:req.body.user.email})
    const item = req.body.cart
    if(!user) {
      return next(new ErrorHandler('Login first to add items'));
  }
        const cart = user.cartItems
        const isItemExist = cart.find(i =>i.product === item.product)
        console.log(cart.product)
        
        if(isItemExist){
            res.status(201).json({
                success : true,
                message: "already exists"
               })
            return
}
else{
   
        user.cartItems.push(item)
        await user.save({validateBeforeSave: false})
        
}
res.status(201).json({
    success : true
   })
   
 });


 exports.cartPlus= catchAsyncError (async (req,res) => {
    //req.body.user = req.user.id
    const user = await User.findOne({email:req.body.user.email})
    const cart = req.body.id
    if(!user) {
      return next(new ErrorHandler('Login first to add items'));
  }
        const items = user.cartItems
        const increaseQuantity = items.map(async item => {if(item.product.toString() === cart){
            if(item.stock === 0 || item.quantity >= item.stock) return
            item.quantity = Number(item.quantity)+ 1
            await user.save({validateBeforeSave: false})
            
        }})
        
        
       
        
    res.status(201).json({
     success : true,
    })
 });


 exports.cartMinus= catchAsyncError (async (req,res) => {
    //req.body.user = req.user.id
    const user = await User.findOne({email:req.body.user.email})
    const cart = req.body.id
    if(!user) {
      return next(new ErrorHandler('Login first to add items'));
  }
        const items = user.cartItems
        const decreaseQuantity = items.map(async item => {if(item.product.toString() === cart){
            if( item.quantity == 1) return
            item.quantity = Number(item.quantity) - 1
            await user.save({validateBeforeSave: false})
            
        }})
        
        
       
        
    res.status(201).json({
     success : true,
    })
 });


 exports.cartDelete= catchAsyncError (async (req,res) => {
    //req.body.user = req.user.id
    const user = await User.findOne({email:req.body.user.email})
    
    const cart = req.body.id
    if(!user) {
      return next(new ErrorHandler('Login first to add items'));
  }
        const items = user.cartItems
        const deleteItem = items.map(async item => {if(item.product.toString() === cart){
            
            item.deleteOne()
            await user.save({validateBeforeSave: false})
            
        }})
        
        
       
        
    res.status(201).json({
     success : true,
    })
 });

 exports.cartAllDelete= catchAsyncError (async (req,res) => {
    //req.body.user = req.user.id
    const user = await User.findOne({email:req.body.user.email})
    
    
    if(!user) {
      return next(new ErrorHandler('Login first to add items'));
  }
    user.cartItems= []
    await user.save({validateBeforeSave: false})
        
        
       
        
    res.status(201).json({
     success : true,
    })
 });

 exports.getCartItems= catchAsyncError(async(req, res, next) => {
    const user = await User.findById(req.user.id);
   // console.log(user);
    const item = user.cartItems
   // console.log(item);
   
    
    if(!item) {
        return next(new ErrorHandler('Item not found', 400));
    }

    res.status(201).json({
        success: true,
        item
    })
})


//  exports.getCartItems= catchAsyncError(async(req, res, next) => {
//     const user = await User.findById(req.params.userId);
//     console.log(req.params.userId);
//     const item = user.cartItems
//     console.log(item);
   
    
//     if(!item) {
//         return next(new ErrorHandler('Item not found', 400));
//     }

//     res.status(201).json({
//         success: true,
//         item
//     })
// })