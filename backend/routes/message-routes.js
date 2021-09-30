const { Router } = require('express');
const { check } = require('express-validator');
const messageController = require('../controllers/message-controller');
const checkAuth = require('../middleware/check-auth');

const router = Router();

router.post(
  '/',
  [check('text').not().isEmpty()],
  messageController.createMessage
);

router.get('/:tid', messageController.getMessagesByTeamId);

module.exports = router;
