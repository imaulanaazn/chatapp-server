const express = require('express');
const router = express.Router();
const os = require('os');
const multer  = require('multer')
const {getUser,setProfileImg, deleteProfileImg} = require('./controller')

router.get('/',getUser)
router.put('/:id/profile',multer({ dest: os.tmpdir() }).single('profilePicture'),setProfileImg)
router.delete('/:id/profile', deleteProfileImg)

module.exports = router;