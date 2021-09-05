const { Router } = require('express');
const { check } = require('express-validator');
const teamControllers = require('../controllers/team-controllers');
const checkAuth = require('../middleware/check-auth');

const router = Router();

router.get('/:tid', teamControllers.getTeamById);

router.get('/user/:uid', teamControllers.getTeamsByUserId);

router.get('/game/:game', teamControllers.getTeamsByGameName);

router.use(checkAuth);

router.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
    check('game').not().isEmpty(),
    check('private').toBoolean(),
  ],
  teamControllers.createTeam
);

router.delete('/:tid', teamControllers.deleteTeam);

router.patch(
  '/:tid',
  [
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
    check('game').not().isEmpty(),
    check('private').toBoolean(),
  ],
  teamControllers.updateTeam
);

module.exports = router;
