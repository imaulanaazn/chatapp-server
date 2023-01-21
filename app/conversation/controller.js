const Conversation = require('./model');

module.exports = {
    newConvo: async (req,res)=>{
        const newConvo = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
        });

        try{
            const savedConvo = await newConvo.save();
            res.status(200).json(savedConvo)
        }catch(err){
            res.status(500).json(err)
        }
    },
    getConvo: async (req,res)=>{
        try{
            const conversation = await Conversation.find({
                members: {$in:[req.params.userId]}
            })
            res.status(200).json(conversation)
        }catch(err){
            res.status(500).json(err)
        }

    }
}