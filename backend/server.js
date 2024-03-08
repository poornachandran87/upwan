const app = require('./app');
const dotenv = require('dotenv');
const connect = require('./config/database')
const path = require('path')

dotenv.config({path:path.join(__dirname,'config','config.env')})

connect()




const server = app.listen(process.env.PORT,()=>{
    console.log(`My Server listening to the port: ${process.env.PORT} in  ${process.env.NODE_ENV} `)
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to unhandled rejection error');
    server.close(()=>{
        process.exit(1);
    })
})

process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception error');
    server.close(()=>{
        process.exit(1);
    })
})