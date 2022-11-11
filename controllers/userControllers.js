
const userDataModel = require('../models/userDataModel')

async function listUsers() {
    try {
        console.log('requesting list of users...')  
        const list_of_users = await userDataModel.find()
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

    const the_user = new userDataModel(data);
    console.log(the_user)
    try{
        console.log('trying...')
        await the_user.save();
        console.log('done!')
        return the_user
    }catch(e){
        console.log(e)
        return "error!!"
    }
    
   
}
async function getUser(data){
    const the_user = new userDataModel(data);
    return the_user
}

module.exports = { listUsers, postUser, getUser }