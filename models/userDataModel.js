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
    name_of_user: {
        type: String,
        trim:true,
        minlength: [3, 'too short name'],
    },
    familyname: {
        type: String,
        trim:true,
        minlength: [3, 'too short lastname'],
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

module.exports = mongoose.model('userDataModel', UserSchema)