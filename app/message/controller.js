const Message = require('./model');

module.exports = {
    newMessage: async (req,res)=>{
        const newMessage = new Message(req.body);

        try {
            const savedMessage = await newMessage.save();
            res.status(200).json(savedMessage)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    getMessages: async (req,res)=>{
        try {
            const messages = await Message.find({
                convoId: req.params.convoId
            })
            res.status(200).json(messages)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}