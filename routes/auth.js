var express = require('express');
var router = express.Router();

const userController = require('../controllers/userControllers')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const response = await userController.listUsers();
  console.log(response)
  if(response.error) res.status(400).json(response.error_message);
  else res.status(200).json(response);
});

router.post('/', async function(req, res, next){
  const data = req.body;
  const response = await userController.postUser(data)
  res.status(200).json(response)
})
router.post('/', async function(req, res){
  const data = req.body
  const userdata = await userController.postUser(data)
  res.status(200).json(userdata)
})

router.put('/', async function(req, res){
  const data = req.body
  const userdata = await userController.getUser(data)
  res.status(200).json(userdata)
})

module.exports = router;
