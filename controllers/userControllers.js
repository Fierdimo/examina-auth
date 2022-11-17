
const userDataModel = require('../models/userDataModel')


//list all users
async function listUsers() {
    try {
        const response = await userDataModel.find()
        return {
            error: false,
            data: response
        };
    } catch (e) {
        return {
            error: true,
            data: e
        };
    }
};

//show user by id
async function getUser(email) {
    try {
        const response = await userDataModel.findOne({email: email})
        return {
            error: false,
            data: response
        };
    } catch (e) {
        return {
            error: true,
            data: e
        };
    }
};

//create a user
async function postUser(data) {
    const response = new userDataModel(data);
    try {
        await response.save();
        console.log(`created new user <${response.email}> at ${response.createdAt}`)
        return {
            error: false,
            data: response
        };
    } catch (e) {
        return {
            error: true,
            data: e
        };
    }
};

//update user's data, except password
async function updateUser(data) {
    try {
        const response = await userDataModel.findByIdAndUpdate(data.id, data, { new: true, runValidators: true });
        console.log(`updated user <${response.email}> at ${response.updatedAt}`)
        return {
            error: false,
            data: response
        };
    } catch (e) {
        return {
            error: true,
            data: e
        };
    }
};

//check if password is valid
async function validatePassword(data) {
    const user = new userDataModel(data)
    try {
        const valid = await user.isValidPassword(data)
        
        return {
            error: valid.error,
            data: valid.message
        };
    } catch (e) {
        return {
            error: true,
            data: e
        };
    }
};

//update password
async function changePassword(data) {
    const user = new userDataModel(data)
    try {
        const response = await user.updatePassword(data)
        return {
            error: false,
            data: response
        };
    } catch (e) {
        return {
            error: true,
            data: e
        };
    }
};

//delete user account
async function deleteUser(id) {
    try {
        console.log('trying to delete user ' + id)
        const response = await userDataModel.findByIdAndDelete(id)
        return {
            error: false,
            data: response
        };
    } catch (e) {
        return {
            error: true,
            data: e
        };
    }
}


module.exports = { listUsers, postUser, getUser, updateUser, validatePassword, changePassword, deleteUser }