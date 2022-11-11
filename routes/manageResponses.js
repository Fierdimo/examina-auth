
async function manageResponse(req, res, next) {
    res.json(req.response)
    next();
}

module.exports = manageResponse