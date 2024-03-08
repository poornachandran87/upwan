const mongoose = require('mongoose')

const connect = () => {
    
        mongoose.connect(process.env.DB_LOCAL_URI)
        .then(con => {console.log(`MongoDB is connected to the host : ${con.connection.host}`)})
        
       
    
}

module.exports = connect;

//DB_LOCAL_URI = mongodb+srv://khushi:123raj@cluster0.vtzunw7.mongodb.net/?retryWrites=true&w=majority
// DB_LOCAL_URI = mongodb://localhost:27017/plants