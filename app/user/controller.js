const User = require('../auth/model');

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
}