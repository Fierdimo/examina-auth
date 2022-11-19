const jwt = require('jsonwebtoken');

const userDataModel = require('../models/userDataModel')

async function getToken(data) {
    const user = new userDataModel();

    const validUser = await user.isValidPassword(data)
    if (!validUser.error) {
        const code = jwt.sign({ email: validUser.data.email, rolname: validUser.data.rol }, process.env.SECRET_KEY);
        return {
            status: 202,
            data: {
                token: code,
                message: "Get this token for a gift"
            }
        }
    } else {
        return {
            status: 401,
            data: {
                message: validUser.message
            }
        };
    }
}

function isValidToken(token) {
    const JWT_ERRORS = ["JsonWebTokenError", "NotBeforeError", "TokenExpiredError"]
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        return {
            status: 202,
            data: {
                pass: true,
                email: decoded.email,
                rolname: decoded.rolname
            }
        }
    } catch (e) {
        if (JWT_ERRORS.includes(e.name)) {
            return {
                status: 406,
                data: {
                    pass: false,
                    error: e
                }
            };
        }

        return {
            status: 400,
            data: e
        };
    }
}

module.exports = { getToken, isValidToken }