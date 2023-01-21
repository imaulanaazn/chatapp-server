const express = require('express');
const router = express.Router();
const {newMessage,getMessages} = require('./controller')

router.post('/',newMessage)
router.get('/:convoId',getMessages)

module.exports = router;