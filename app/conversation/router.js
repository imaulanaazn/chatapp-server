const express = require('express');
const router = express.Router();
const {newConvo, getConvo} = require('./controller')

router.post('/',newConvo)
router.get('/:userId',getConvo)

module.exports = router;