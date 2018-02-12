const express = require('express');

const router = express.Router();

const appController = require('../controllers/appController');

/*
GET home page.
*/
router.get(
  '/',
  appController.getIndexPage,
);

/*
Route to Add New User.
*/
router.post(
  '/user/new',
  appController.validateInput,
  appController.addUser,
);


/*
Route to get Each User
*/
router.get(
  '/user/:userId',
  appController.getUser,
);

/*
Route to get Delete Each user
*/
router.delete(
  '/user/delete/:userId',
  appController.checkUserExists,
  appController.deleteUser,
);

/*
Route to get Update user
*/
router.put(
  '/user/update/:userId',
  appController.validateInput,
  appController.checkUserExists,
  appController.updateUser,
);


/*
Route to get All user
*/
router.get(
  '/users',
  appController.getUsers,
);

module.exports = router;
