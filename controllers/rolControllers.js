const rolModel = require('../models/rolModel');

//list all roles
async function listAllRoles(){
    try {
        const response = await rolModel.find()
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

//read a rol
async function getRol(requiredRol){
    try {
        const response = await rolModel.findOne({rolname: requiredRol})
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

//create a rol
async function setRol(data){
    const newRol = new rolModel(data)
    try {
        await newRol.save();
        return {
            error: false,
            data: newRol
        };
    } catch (e) {
        return {
            error: true,
            data: e
        };
    }

};

//modify actions
async function updateActions(rol, actions){
    const oldRolModel = new rolModel()
    try {
        const response = await oldRolModel.updateActions(rol, actions)
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

//delete rol
async function deteleRol(requiredRol){
    try {
        const response = await rolModel.findOneAndDelete({rolname: requiredRol})
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

//answer if an action is valid for a rol
async function isValidAction(rol, action){
    const newRol = new rolModel()
    console.log(action)
    try {
        const response = await newRol.canDoThis(rol, action)
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


module.exports = {listAllRoles, getRol, setRol, updateActions, deteleRol, isValidAction}