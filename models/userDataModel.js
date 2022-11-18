const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'No username'],
        index: { unique: true, dropDups: true, },
        trim: true,
        lowercase: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
    rolname: {
        type: String,
        required: [true, 'No rol'],
        enum: {
            values: process.env.ROLES,
            message: '{VALUE} is not a valid number'
        }
    }
}, {
    timestamps: true
}
)

// misc
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// encrypt password before <SAVE> document
UserSchema.pre('save', async function (next) {
    this.password = await hashPassword(this.password);
    next();
})

// methods
UserSchema.method('isValidPassword', async function (data) {
    try {
        const me = await Users.findOne({ email: data.email })
        if (me) {
            const validPassword = await bcrypt.compare(data.password, me.password)
            if (validPassword) return {
                error: false,
                data: me
            }
            return {
                error: true,
                message: 'forbidden'
            }

        }else {
            return {
                error: true,
                message: 'user not found'
            }
        }

    } catch (e) {
        return e
    }
})

UserSchema.method('updatePassword', async function (data) {
    const newPasswordHash = await hashPassword(data.password);
    try {
        const response = await Users.findOneAndUpdate({email:data.email}, { password: newPasswordHash }, { new: true });
        return response
    } catch (e) {
        return e
    }
})

const Users = mongoose.model('user', UserSchema)

Users.on('index', function (err) {
    if (err) console.error(err); // error occurred during index creation
})

module.exports = Users