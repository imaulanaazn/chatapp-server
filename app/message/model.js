const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema(
    {
        convoId: String,
        sender: String,
        text: String 
    },
    {timestamps: true}
)

module.exports = mongoose.model("Message",MessageSchema)