const  mongoose  = require("mongoose");
require('dotenv').config()

const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI);
        // console.log('db connected');
         console.log('dataBase connected :', connection.host);
    } catch (error) {
        console.log(error);
        throw(error);
    }

}

module.exports = connectDB;