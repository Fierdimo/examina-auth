const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
    actions: {
        type: [String],
        required: [true, 'Rol without assigned actions'],
    },
    rolname: {
        type: String,
        required: [true, 'Rol without assigned name'],
        unique: true,
        enum: {
            values: ["USER", "ADMIN", "GUEST"],
            message: '{VALUE} is not a valid rol'
        }
    }
}, {
    timestamps: true
});

//miscues
function checkValidActions(actions){
    const VALID_ACTIONS = process.env.VALID_ACTIONS;    
    actions.forEach(action => {
        if (!(VALID_ACTIONS.includes(action)) || action === "") throw `To <${action}> is NOT VALID action`;
    });
};

//check actions format
rolSchema.pre('save', function (next) {    
    this.actions = JSON.parse(this.actions);
    if (this.actions[0] == '') throw "there's no actions";
    checkValidActions(this.actions)
    next();
});

//methods
rolSchema.method('updateActions', async function (rol,actions) {

    actions = JSON.parse(actions);
    checkValidActions(actions);
   
    try{
        const response = await roles.findOneAndUpdate({ rolname: rol }, { actions: actions }, { new: true });
        return response;
    }catch(e){
        return e;
    }
});

rolSchema.method('canDoThis', async function(rol, action){
    try{
        const response = await roles.findOne({rolname: rol});
        if (!response) throw false
        if (response.actions.includes(action)) return true;
        return false;
    }catch(e){
        return e;
    }
})

const roles = mongoose.model('rol', rolSchema)

roles.on('index', function (err) {
    if (err) console.error(err); // error occurred during index creation
})

module.exports = roles