const { default: mongoose } = require('mongoose');
const userModel = require('../models/user')

async function listUsers() {
    try {
        console.log('requesting list of users...')  
        const list_of_users = await userModel.find({});
        console.log('responsed:')
        console.log(list_of_users)
        return list_of_users;
    } catch (e) {
        return {
            error_message: "ups... " + e,
            error: true
        }
    }
}

async function postUser(data){
    const the_user = new userModel(data);
    the_user.save();
    return "saved!"
}

module.exports = { listUsers, postUser }