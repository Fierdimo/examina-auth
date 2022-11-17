const jwt = require('jsonwebtoken');

const userDataModel = require('../models/userDataModel')

async function getToken(data) {
    const user = new userDataModel();
    try {
        const validUser = await user.isValidPassword(data)
        if (!validUser.error) {
            const code = jwt.sign({ email: validUser.data.email, rolname: validUser.data.rol }, process.env.SECRET_KEY);
            return {
                error: false,
                data: { token: code }
            }
        } else {
            throw "I can't accept this credentials"
        }
    } catch (e) {
        return {
            error: true,
            data: e
        };
    }
}

function isValidToken(token) {
    const JWT_ERRORS = ["JsonWebTokenError", "NotBeforeError", "TokenExpiredError"]
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        return {
            error: false,
            data: {
                pass: true,
                email: decoded.email,
                rolname: decoded.rolname
            }
        }
    } catch (e) {
        if (JWT_ERRORS.includes(e.name)) {
            return {
                error: false,
                data: {
                    pass: false,
                    error: e
                }
            };
        }

        return {
            error: true,
            data: e
        };
    }
}

module.exports = { getToken, isValidToken }