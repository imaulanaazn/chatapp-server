const User = require('../auth/model');
const path = require('path')
const fs = require('fs')
const config = require('../../config')

module.exports = {
    getUser: async (req,res)=>{
        const userId = req.query.userId;
        const username = req.query.username;
        try {
            const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
            const { password, updatedAt, ...other } = user._doc;
            res.status(200).json(other);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    setProfileImg: async (req,res,next)=>{
        const userId = req.params.id
        try {
            if(req.file){
                let tmp_path= req.file.path;
                let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originaExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)
        
                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)
        
                src.pipe(dest)
        
                src.on('end', async ()=>{
                  try {
        
                    const user = await User.findByIdAndUpdate(userId, {profilePicture:filename}, {new:true})
                    res.status(200).json({ data : user }) 
                  } catch (err) {
                    if(err && err.name === "ValidationError"){
                      return res.status(422).json({
                        error: 1,
                        message: err.message,
                        fields: err.errors
                      })
                    }
                    next(err)
                  }
                })
              }
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    deleteProfileImg: async (req,res)=>{
      const userId = req.params.id;

      try {
        await User.findByIdAndUpdate(userId, {profilePicture:""}, {new:true})
        res.status(200).json({message: "profile deleted"})
      } catch (err) {
        res.status(500).json(err)
      }
    }
}