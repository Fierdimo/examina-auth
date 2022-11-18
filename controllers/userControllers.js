
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
        const response = await userDataModel.findOne({ email: email })
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
    delete data.password;
    delete data.rolname;
    try {
        const response = await userDataModel.findOneAndUpdate({ email: data.email }, data, { new: true, runValidators: true });
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

async function upgradeUser(data) {
    const upgrade_order = process.env.ROLES;    

    try {
        const user = await userDataModel.findOne({ email: data });
        if(!user) throw "no user"
        
        let user_rol = upgrade_order.indexOf(user.rolname);    
        
        if (user_rol && (user_rol < (upgrade_order.length - 1))) {
            user_rol++;
            try {
                const response = await userDataModel.findOneAndUpdate(
                    { email: data},
                    { rolname: upgrade_order(user_rol) },
                    { new: true, runValidators: true });
    
                console.log(`upgraded user <${response.email}> at ${response.updatedAt}`)
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

    } catch (e) {
        return {
            error: true,
            data: e
        };
    }       

    return {
        error: true,
        data: "Impossible"
    };
}

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
    const user = new userDataModel()
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
async function deleteUser(email) {
    try {
        const response = await userDataModel.findOneAndDelete({ email: email })
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


module.exports = { listUsers, postUser, getUser, updateUser, validatePassword, changePassword, deleteUser, upgradeUser }