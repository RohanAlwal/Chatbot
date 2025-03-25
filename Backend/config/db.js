const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

const connectdb = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);

    } catch(err){
        res.send({err});
    }
}

module.exports = connectdb;