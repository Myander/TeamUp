const { Router } = require('express');
const { check } = require('express-validator');
const conversationController = require('../controllers/conversation-controller');
const checkAuth = require('../middleware/check-auth');

// new conversation
router.post('/', conversationController.createConversation);

module.exports = router;
