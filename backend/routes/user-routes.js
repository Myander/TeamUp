const express = require('express');
const { check } = require('express-validator');
const usersControllers = require('../controllers/users-controller');

const router = express.Router();

// router.get('/', usersControllers.testFun);

router.post(
  '/signup',
  [
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 5 }),
    check('username').not().isEmpty(),
  ],
  usersControllers.signup
);

router.post('/login', usersControllers.login);

router.patch('/:uid', usersControllers.updateUser);

module.exports = router;
