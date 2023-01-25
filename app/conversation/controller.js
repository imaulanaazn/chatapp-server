const {PrivateConvo,GroupConvo} = require('./model');
const Message = require('../message/model.js') 

module.exports = {
    newPrivateConvo: async (req,res)=>{
        const newConvo = new PrivateConvo({
            members: [req.body.senderId, req.body.receiverId]
        });

        try{
            const savedConvo = await newConvo.save();
            res.status(200).json(savedConvo)
        }catch(err){
            res.status(500).json(err)
        }
    },

    getPrivateConvo: async (req,res)=>{
        try{
            const conversation = await PrivateConvo.find({$and:[
                    {members: {$in:[req.params.userId]}},
                    {archived: {$nin:[req.params.userId]}}
                ]});
            res.status(200).json(conversation)
        }catch(err){
            res.status(500).json(err)
        }
    },

    newGroupConvo: async (req,res)=>{
        const newConvo = new GroupConvo(req.body);

        try{
            const savedConvo = await newConvo.save();
            res.status(200).json(savedConvo)
        }catch(err){
            res.status(500).json(err)
        }
    },

    getGroupConvo: async (req,res)=>{
        try{
            const conversation = await GroupConvo.find({$and:[
                {members: {$in:[req.params.userId]}},
                {archived: {$nin:[req.params.userId]}}
            ]})
            res.status(200).json(conversation)
        }catch(err){
            res.status(500).json(err)
        }
    },

    getArchivedConvo: async (req,res)=>{
        const userId = req.params.userId

        try {
            const archivedPrivateConvo = await PrivateConvo.find({
                $and:[
                    {members: {$in:[userId]}},
                    {archived: {$in:[userId]}}
                ]
            })

            const archivedGroupConvo = await GroupConvo.find({
                $and:[
                    {members: {$in:[userId]}},
                    {archived: {$in:[userId]}}
                ]
            })

            res.status(200).json([...archivedPrivateConvo,...archivedGroupConvo])

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    deletePrivateConvo: async (req,res)=>{
        const convoId = req.params.convoId;

        try {
            await PrivateConvo.findByIdAndDelete(convoId)
            await Message.deleteMany({convoId})
            res.status(200).json({message: "conversation deleted"})
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    archivePrivateConvo: async (req,res)=>{
        const convoId = req.params.convoId;
        const userId = req.body.userId;
            
        try {
            const privateConvo = await PrivateConvo.findById(convoId)
            try {
                const newPrivateConvo = await PrivateConvo.findByIdAndUpdate(convoId, 
                    {archived:[userId, ...privateConvo.archived]}, 
                    {new:true}
                    )
                res.status(200).json(newPrivateConvo);
            } catch (err) {
                console.log(err)
                throw err
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },

    archiveGroupConvo: async (req,res)=>{
        const convoId = req.params.convoId;
        const userId = req.body.userId;
            
        try {
            const groupConvo = await GroupConvo.findById(convoId)
            console.log(groupConvo)
            try {
                const newGroupConvo = await GroupConvo.findByIdAndUpdate(convoId, 
                    {archived:[userId, ...groupConvo.archived]}, 
                    {new:true}
                    )
                res.status(200).json(newGroupConvo);
            } catch (err) {
                console.log(err)
                throw err
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    }

    //delete group convo
}