const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'No username'],
        index: { unique: true, dropDups: true, },
        trim: true,
        lowercase: true,
        match:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: [true, 'No password'],
        minlength: [3, "too short password"]
    },
    username: {
        type: String,
        required: [true, 'No name'],
        trim: true,
        minlength: [3, 'too short name'],
    },
    rol: {
        type: String,
        required: [true, 'No rol'],
        enum: {
            values: ["USER", "ADMIN", "GUEST"],
            message: '{VALUE} is not a valid number'
          }
    }
}, {
    timestamps: true
}
)
// encrypt password before save document on creation
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// methods
UserSchema.method('isValidPassword', async function (data) {
    try {
        const me = await Users.findById(data.id)
        const validPassword = await bcrypt.compare(data.password, me.password)
        if (validPassword) return true
        return false
    }catch{
        throw "error with pw"
    }
    
})

// UserSchema.method('isValidAction', async function (user, action) {
//     const me = await Users.find({ email: user })
//     const permissions = await permissionModel.forThisAction(action)
//     if (permissions.includes(me.roles)) return true;
//     return false
//     return me
// })

const Users = mongoose.model('user', UserSchema)

Users.on('index', function (err) {
    if (err) console.error(err); // error occurred during index creation
})

module.exports = Users