
async function manageResponse(req, res, next) {
    let status = 400;
    let message = "hubo un error"
    if (req.response) {
        if (typeof (req.response.data) == 'object') 
            if ("password" in req.response.data) req.response.data.password = "*********";

        if (!req.response.error) status = 200;
        
        message = req.response.data
    }

    res.status(status).json(message);
    next();
}

module.exports = manageResponse