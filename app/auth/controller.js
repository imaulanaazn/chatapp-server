const User = require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config')

module.exports = {
    register: async (req, res) => {
        try {
            //generate new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            
            console.log(hashedPassword)
          //create new user
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
          });
      
          //save user and respond
          const user = await newUser.save();
          delete user._doc.password;
          const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
          }, config.jwtKey);
          res.status(200).json({token});
        } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
    },
    login:  async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if(!user){
              res.status(404).json("user not found");
            }
            
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if(validPassword) {
              delete user._doc.password;
              const token = jwt.sign({
                id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
              }, config.jwtKey);
              res.status(200).json({token});
            }else{
              res.status(400).json("wrong password")
            }
        } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
    }
}