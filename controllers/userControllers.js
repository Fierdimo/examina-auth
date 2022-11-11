
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

async function postUser(data) {

    const the_user = new userDataModel(data);

    try {
        // console.log(await the_user.isValidAction(the_user.email))
        await the_user.save();
        console.log(`created new user <${the_user.email}> at ${the_user.createdAt}`)
        return the_user
    } catch (e) {
        console.log('==================== ERRORS ================================')
        // if(e.errors) return e.errors
        return e
        // console.log(e.errors.rol.properties)
        // return e.errors.rol.properties.message
    }


}

async function updateUser(id, data) {
    try {
        const response = await userDataModel.findByIdAndUpdate(id, data, {new:true});
        console.log(`updated user <${response.email}> at ${response.updatedAt}`)
        return response
    } catch (e) {
        console.log('==================== ERROR! ================================')
        return e
    }
}

async function validatePassword(data){
    const user = new userDataModel(data)
    try{
        const valid = await user.isValidPassword(data)
        if(valid) return "contraseña valida"
        return "contraseña invalida"
    }catch (e){
        return e
    }
}


async function getUser(data) {
    const the_user = new userDataModel(data);
    return the_user
}

module.exports = { listUsers, postUser, getUser, updateUser, validatePassword }