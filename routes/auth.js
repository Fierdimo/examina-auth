const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

const userController = require('../controllers/userControllers')

/* GET users listing. */
router.get('/auth', async function(req, res) {
  const response = await userController.listUsers();
  console.log(response)
  if(response.error) res.status(400).json(response.error_message);
  else res.status(200).json(response);
});

router.post('/auth', async function(req, res){
  const data = req.body;
  const response = await userController.postUser(data)
  const salt = await bcrypt.genSalt(10);
  res.status(200).json(response)
})


router.put('/', async function(req, res){
  const data = req.body
  const userdata = await userController.getUser(data)
  res.status(200).json(userdata)
})

module.exports = router;
