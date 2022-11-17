const express = require('express')
const router = express.Router();

const authenticationController = require('../controllers/authenticationController');
const rolController = require('../controllers/rolControllers')

router.get('/', async function (req, res, next) {
    req.response = await authenticationController.getToken(req.body)
    next();
})

router.post('/:token', async function(req, res, next){
    const response = authenticationController.isValidToken(req.params.token);
    if(!response.error){
        const validAction = await rolController.isValidAction(response.data.rolname, req.body.action)
        
        if(!validAction.data){
            response.data = {
                pass: false,
                error: "El usuario NO cuenta con privilegios para esta acción"
            }
        }
    }
    
    req.response = response;
    next();
})

module.exports = router;

//TODO: persistencia del usuario. si entra desde otro dispositivo debe ser bloqueado hasta que autorice de nuevo
//tener en cuenta na posible desconexion del usuario