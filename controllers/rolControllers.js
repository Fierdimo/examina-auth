const rolModel = require('../models/rolModel');

//list all roles
async function listAllRoles() {
    try {
        const response = await rolModel.find()
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

//read a rol
async function getRol(requiredRol) {
    try {
        const response = await rolModel.findOne({ rolname: requiredRol })
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

//create a rol
async function setRol(data) {
    const newRol = new rolModel(data)
    try {
        await newRol.save();
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

//modify actions
async function updateActions(rol, actions) {
    const oldRolModel = new rolModel()
    try {
        const response = await oldRolModel.updateActions(rol, actions)
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

//delete rol
async function deteleRol(requiredRol) {
    try {
        const response = await rolModel.findOneAndDelete({ rolname: requiredRol })
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

//answer if an action is valid for a rol
async function isValidAction(rol, action) {
    console.log(rol)
    const newRol = new rolModel()
    try {
        const response = await newRol.canDoThis(rol, action);
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


module.exports = { listAllRoles, getRol, setRol, updateActions, deteleRol, isValidAction }