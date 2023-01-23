const express = require('express');
const router = express.Router();
const {getUser,setProfile} = require('./controller')
const os = require('os');
const multer  = require('multer')

router.get('/',getUser)
router.put('/:id/profile',multer({ dest: os.tmpdir() }).single('profilePicture'),setProfile)

module.exports = router;