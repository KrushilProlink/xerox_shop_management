const Joi = require("joi");

const validSignup = Joi.object({
    username: Joi.string().min(3).required("username"),
    email: Joi.string().email().required("email"),
    mobileNo: Joi.string().trim()
        .regex(/^[0-9]{10}$/)
        .message('Invalid mobile number format. Please enter a 10-digit number.')
        .required("mobileNo"),
    password: Joi.string().min(6).required("password"),    
});

const validSignin = Joi.object({
   email: Joi.string().email().required("email"),
   password: Joi.string().min(6).required("password")
});


module.exports = { validSignup, validSignin };