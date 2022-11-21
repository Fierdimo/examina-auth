const express = require('express');
const router = express.Router();

const rolController = require('../controllers/rolControllers');


//Show a list of all roles
router.get('/list', async function (req, res, next) {
  req.response = await rolController.listAllRoles()
  next()
});

//show a specified rol
router.get('/show', async function (req, res, next) {
  req.response = await rolController.getRol(req.body.rolname)
  next();
});

//create new rol
router.post('/create', async function (req, res, next) {
  req.response = await rolController.setRol(req.body)
  next();
});

//Update rol permissions
router.post('/update', async function (req, res, next) {
  req.response = await rolController.updateActions(req.body.rolname, req.body.actions);
  next();
});

//delete rol
router.delete('/', async function (req, res, next) {
  req.response = await rolController.deteleRol(req.body.rolname)
  next();
});
//check if a rol can do an action

router.get('/isValidAction', async function (req, res, next) {
  console.log('req')
  console.log(req.body)
  req.response = await rolController.isValidAction(req.body.rolname, req.body.action)
  next()
})

module.exports = router;