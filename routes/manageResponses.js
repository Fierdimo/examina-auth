
async function manageResponse(req, res, next) {
    if(req.response) if("password" in req.response) req.response.password = "*********"
    res.json(req.response)
    next();
}

module.exports = manageResponse