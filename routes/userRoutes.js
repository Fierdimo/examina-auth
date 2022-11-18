const express = require('express');
const router = express.Router();

const userController = require('../controllers/userControllers')


// GET users listing
router.get('/list', async function (req, res, next) {
  req.response = await userController.listUsers();
  next();
});

// GET user by email
router.get('/show/:email', async function (req, res, next) {
  req.response = await userController.getUser(req.params.email)
  next();
});

//create new user
router.post('/create', async function (req, res, next) {
  req.response = await userController.postUser(req.body)
  next();
});

//Update user's data except password & rol
router.post('/update', async function (req, res, next) {
  req.response = await userController.updateUser(req.body);
  next();
});

// update rolname >> upgrade
router.post('/upgrade/:email', async function (req, res, next) {  
  req.response = await userController.upgradeUser(req.params.email);
  next();
});

//validate password *** ???
router.get('/validatepassword', async function (req, res, next) {
  req.response = await userController.validatePassword(req.body)
  next()
});

//delete user by email
router.delete('/:email', async function (req, res, next) {
  req.response = await userController.deleteUser(req.params.email);
  next();
});

//update password
router.post('/changepassword', async function (req, res, next) {
  req.response = await userController.changePassword(req.body)
  next()
});






module.exports = router;
