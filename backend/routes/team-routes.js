const { Router } = require('express');
const { check } = require('express-validator');
const teamController = require('../controllers/team-controller');
const checkAuth = require('../middleware/check-auth');

const router = Router();

router.get('/:tid', teamController.getTeamById);

router.get('/user/:uid', teamController.getTeamsByUserId);

router.get('/game/:game', teamController.getTeamsByGameName);

router.use(checkAuth);

router.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
    check('game').not().isEmpty(),
    check('private').toBoolean(),
  ],
  teamController.createTeam
);

router.delete('/:tid', teamController.deleteTeam);

router.patch(
  '/:tid',
  [
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
    check('game').not().isEmpty(),
    check('private').toBoolean(),
  ],
  teamController.updateTeam
);

module.exports = router;
