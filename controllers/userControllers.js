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
    try{
        the_user.save();
        return  the_user
    }catch(e){
        console.log(e)
        return "error!!"
    }
    
   
}
async function getUser(data){
    const the_user = new userModel(data);
    return the_user
}

module.exports = { listUsers, postUser, getUser }