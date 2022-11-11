
const userDataModel = require('../models/userDataModel')


//list all users
async function listUsers() {
    try {
        const list_of_users = await userDataModel.find()
        return list_of_users;
    } catch (e) {
        return e
    }
};

//show user by id
async function getUser(id) {
    const user = new userDataModel()
    try {
        const the_user = await user.getUser(id)
        return the_user
    }catch (e){
        return e
    }
};

//create a user
async function postUser(data) {
    const the_user = new userDataModel(data);
    try {
        // console.log(await the_user.isValidAction(the_user.email))
        await the_user.save();
        console.log(`created new user <${the_user.email}> at ${the_user.createdAt}`)
        return the_user
    } catch (e) {
        return e
    }
};

//update user's data, except password
async function updateUser(data) {
    try {
        const response = await userDataModel.findByIdAndUpdate(data.id, data, { new: true, runValidators: true });
        console.log(`updated user <${response.email}> at ${response.updatedAt}`)
        return response
    } catch (e) {
        return e
    }
};

//check if password is valid
async function validatePassword(data) {
    const user = new userDataModel(data)
    try {
        const valid = await user.isValidPassword(data)
        if (valid) return "contraseña valida"
        return "contraseña invalida"
    } catch (e) {
        return e
    }
};

//update password
async function changePassword(data) {
    const user = new userDataModel(data)
    try {
        const valid = await user.updatePassword(data)
        return valid
    } catch (e) {
        return e
    }
};

//delete user account
async function deleteUser(id) {
    try {
        console.log('trying to delete user ' + id)
        const response = await userDataModel.findByIdAndDelete(id)
        return response
    } catch (e) {
        console.log('==================== ERROR! ================================')
        return e
    }
}


module.exports = { listUsers, postUser, getUser, updateUser, validatePassword, changePassword, deleteUser }