const catchAsyncError = require('../middlewares/catchAsyncError');
const stripe = require('stripe')("sk_test_51OgkfFSFO8k0A269WG9x0g7ftf54z7xWTnAZOtwrl2BdfAN1DGfCPI2J0BpEds5Lo1ZZT5e2qfd4AYLXDHKJxCsK00jCpzvaYv")

exports.processPayment  = catchAsyncError(async(req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "INR",
        description: "TEST PAYMENT",
        metadata: { integration_check: "accept_payment"},
        shipping: req.body.shipping
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

exports.sendStripeApi  = catchAsyncError(async(req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})