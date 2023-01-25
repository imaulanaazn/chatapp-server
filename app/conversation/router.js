const express = require('express');
const router = express.Router();
const {
    newPrivateConvo, getPrivateConvo, newGroupConvo, getGroupConvo, 
    deletePrivateConvo,  archivePrivateConvo, archiveGroupConvo,
    getArchivedConvo
} = require('./controller')

router.post('/private',newPrivateConvo)
router.get('/private/:userId',getPrivateConvo)

router.post('/groups',newGroupConvo)
router.get('/groups/:userId',getGroupConvo)

router.delete('/private/:convoId',deletePrivateConvo)

router.put('/private/:convoId',archivePrivateConvo)
router.put('/group/:convoId',archiveGroupConvo)

router.get('/:userId',getArchivedConvo)

module.exports = router;