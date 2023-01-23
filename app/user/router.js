const express = require('express');
const router = express.Router();
const {getUser,setProfileImg} = require('./controller')
const os = require('os');
const multer  = require('multer')

router.get('/',getUser)
router.put('/:id/profile',multer({ dest: os.tmpdir() }).single('profilePicture'),setProfileImg)

module.exports = router;