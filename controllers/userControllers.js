
const userDataModel = require('../models/userDataModel')


//list all users
async function listUsers() {
    try {
        const response = await userDataModel.find()
        return {
            status: 200,
            data: response
        };
    } catch (e) {
        return {
            status: 503,
            data: e.name
        };
    }
};

//show user by id
async function getUser(email) {
    try {
        const response = await userDataModel.findOne({ email: email })
        return {
            status: 200,
            data: response
        };
    } catch (e) {
        return {
            status: 503,
            data: e.name
        };
    }
};

//create a user
async function postUser(data) {
    const response = new userDataModel(data);
    try {
        await response.save();
        return {
            status: 201,
            data: response
        };
    } catch (e) {
        return {
            status: 503,
            data: e.name
        };
    }
};

//update user's data, except password
async function updateUser(data) {
    delete data.password;
    delete data.rolname;
    try {
        const response = await userDataModel.findOneAndUpdate({ email: data.email }, data, { new: true, runValidators: true });
        return {
            status: 200,
            data: response
        };
    } catch (e) {
        return {
            status: 503,
            data: e.name
        };
    }
};

async function upgradeUser(data) {
    const upgrade_order = process.env.ROLES;

    try {
        const user = await userDataModel.findOne({ email: data });
        if (!user) throw "no user"

        let user_rol = upgrade_order.indexOf(user.rolname);

        if (user_rol && (user_rol < (upgrade_order.length - 1))) {
            user_rol++;
            try {
                const response = await userDataModel.findOneAndUpdate(
                    { email: data },
                    { rolname: upgrade_order(user_rol) },
                    { new: true, runValidators: true });

                return {
                    status: 200,
                    data: response
                };
            } catch (e) {
                return {
                    status: 503,
                    data: e.name
                };
            }
        }

    } catch (e) {
        return {
            status: 503,
            data: e
        };
    }

    return {
        error: true,
        data: "Impossible"
    };
}

//update password
async function changePassword(data) {
    const user = new userDataModel()
    try {
        const response = await user.updatePassword(data)
        return {
            status: 200,
            data: response
        };
    } catch (e) {
        return {
            status: 503,
            data: e.name
        };
    }
};

//delete user account
async function deleteUser(email) {
    try {
        const response = await userDataModel.findOneAndDelete({ email: email })
        return {
            status: 200,
            data: response
        };
    } catch (e) {
        return {
            status: 503,
            data: e.name
        };
    }
}


module.exports = { listUsers, postUser, getUser, updateUser, changePassword, deleteUser, upgradeUser }