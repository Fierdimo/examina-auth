const express = require('express');
const router = express.Router();


const userController = require('../controllers/userControllers')

/* GET users listing. */
router.get('/auth', async function(req, res) {
  const response = await userController.listUsers();

  if(response.error) res.status(400).json(response.error_message);
  else res.status(200).json(response);
});

router.post('/auth', async function(req, res){
  const data = req.body;
  const response = await userController.postUser(data)
  
  res.status(200).json(response)
})

router.post('/update', async function(req, res){
  const id = req.body.id
  delete req.body.id
  const data = req.body;
  
  const response = await userController.updateUser(id, data)
  
  res.status(200).json(response)
})

router.get('/validatepassword', async function(req, res, next){
  const data = req.body
  req.response = await userController.validatePassword(data)
  next()
})


router.put('/', async function(req, res){
  const data = req.body
  const userdata = await userController.getUser(data)
  res.status(200).json(userdata)
})

module.exports = router;
