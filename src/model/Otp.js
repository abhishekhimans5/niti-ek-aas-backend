import mongoose from "mongoose";

const OtpSchema = mongoose.Schema({
    otp : {
        type : Number,
        required : true,
    },
    purpose : {
        type : String,
        required : true,
    },
    userId : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
    }
})

const Otp = mongoose.model('Otp', OtpSchema,'otp')
export default Otp;