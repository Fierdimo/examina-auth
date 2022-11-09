const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'No username'],
        trim:true,
        lowercase:true
    },
    password: {
        type: String,
        required: [true,'No password'],
        trim:true,
        minlength:[8,'password too short']
    },
    name: {
        type: String,
        trim:true
    },
    lastname: {
        type: String,
        trim:true
    },
    email: {
        type: String,
        trim:true
    },
    group: {
        type: String,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        immutable:true
    }
})

module.exports = mongoose.model('users', UserSchema)