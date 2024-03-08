const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const payment = require('./routes/payment')
const cart = require('./routes/cart')
const path = require('path')

const errorMiddleWare = require('./middlewares/error');
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,'config','config.env')})

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )
// app.use(function(req,res,next){
//     res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
//     res.header("Access-Control-Allow-Methods", 'GET,POST');
//     res.header("Access-Control-Allow-Headers", 'X-PINGOTHER, Content-Type')
//     next();
// })

app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use('/api/v1/',order);
app.use('/api/v1/',payment);
app.use('/api/v1/',cart);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}




app.use(errorMiddleWare)


module.exports = app;
