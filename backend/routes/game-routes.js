const express = require('express');
const { check } = require('express-validator');
const gamesController = require('../controllers/games-controller');

const router = express.Router();

router.get('/', gamesController.getGames);

module.exports = router;
