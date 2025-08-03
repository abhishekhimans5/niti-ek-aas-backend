
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        unique : true,
        validate: {
            validator: function (value) {
              return value.endsWith('.com'); // Ensure email ends with @mymail.com
            },
        message: 'Email must end with .com',
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        validate: {
            validator: function (value) {
              // Regex to check uppercase, lowercase, special character
              return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/.test(value);
            },
            message:
              'Password must include at least one uppercase letter, one lowercase letter, and one special character.',
        }
    },

    createdAt : {
        type : Date,
        required : true,
        default : Date.now
    },
    lastLogin : {
        type : Date,
        default : Date.now
    },
    status: { 
        type: String,
        enum: ['active', 'inactive', 'banned'],
        default: 'active'
    },
    role: {
        type: String,
        enum: ['user', 'admin','businessman','investor','advisor'],
        default: 'businessman'
    },
    company_url : {
        type : String,
    },
    funding_needed : {
        type : Boolean,
        required : true,
        default : true
    },
    business_type : {
        type : [String],
        required : true,
    },
    availability_type : {
        type : String,
        required : false,
        default : 'full time',
        enum : ['','full time','part time','consultation basis']
    },
    years_of_experience : {
        type : Number,
        default : 0,
        required : true
    },
    area_of_expertise : {
        type : String,
    },
    portfolio_url : {
        type : String,
    },
    min_investment : {
        type : Number,
        required : true,
        default : 10000,
    },
    max_investment : {
        type : Number,
        required : true,
        default : 100000,
    },
    investment_type : {
        type : String,
        default : "equity",
        required : true,
        enum : ['equity','debt','equity&debt']
    },
    social_media_url : {
        type : String,
    },
     preferred_area_of_investment : {
        type : [String],
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    followers : {
        count : {
            type : Number,
        },
        idFollowers : {
            type : [mongoose.Schema.Types.ObjectId],
            required : false
        }
    },
    following : {
        count : {
            type : Number,
        },
        idFollowing : {
            type : [mongoose.Schema.Types.ObjectId],
            required : false
        }
    },


})

const User = mongoose.model('User', UserSchema,'users');

export default User;

/* 
company_name : "",
          company_url : "",
          funding_needed : null,
          business_type : "",
          // for advisor
          availability_type : "",
          years_of_experience : 0, // for both : investor and advisor
          area_of_expertise : "",
          portfolio_url : "",
          // for investors
          min_investment : null,
          max_investment : null,
          investment_type : "",
          social_media_url : "",
          preferred_area_of_investment : "",
*/