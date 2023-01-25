const mongoose = require('mongoose');

const PrivateConvoSchema = mongoose.Schema(
    {
        members:{
            type: Array,
            required: true,
        },
        archived: {
            type: Array,
            default: []
        },
    },
    {timestamps: true}
)

const GroupConvoSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        members:{
            type: Array,
            required: true,
        },
        archived: {
            type: Array,
            default: []
        },
        admin: {
            type: Array,
            required: true,   
        }
    },
    {timestamps: true}
)

const PrivateConvo = mongoose.model("PrivateConvo", PrivateConvoSchema)
const GroupConvo = mongoose.model("GroupConvo", GroupConvoSchema)

module.exports = {PrivateConvo,GroupConvo}