const mongoose = require('mongoose')
require('dotenv').config()

module.exports.connectDB = async ()=>{
    try {
        const mongoUrl = process.env.MONGODB_URL;
        await mongoose.connect(mongoUrl,  {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
          })
    } catch (error) {
        console.log(error.message);
        console.log('Could not connect to database');
    }
}