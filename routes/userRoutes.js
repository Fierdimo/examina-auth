const express = require('express');
const router = express.Router();

const userController = require('../controllers/userControllers')


// GET users listing
router.get('/list', async function (req, res, next) {
  req.response = await userController.listUsers();
  next();
});

// GET user by ID
router.get('/show/:email', async function (req, res, next) {
  req.response = await userController.getUser(req.params.email)
  next();
});

//create new user
router.post('/create', async function (req, res, next) {
  req.response = await userController.postUser(req.body)
  next();
});

//Update user's data except password
router.post('/update', async function (req, res, next) {
  delete req.body.password;
  const data = req.body;
  req.response = await userController.updateUser(data);
  next();
});

//validate password
router.get('/validatepassword', async function (req, res, next) {
  const data = req.body
  req.response = await userController.validatePassword(data)
  next()
});

//update password
router.post('/changepassword', async function (req, res, next) {
  const data = req.body
  req.response = await userController.changePassword(data)
  next()
});

//delete user by id
router.delete('/:id', async function (req, res, next) {
  req.response = await userController.deleteUser(req.params.id);
  next();
});


module.exports = router;
