const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const partySchema = new mongoose.Schema({

    partyName: {
        type: String,
       
        require: true
    },
    vote: {
        type: Number,
        require: true
    },
    Id: {
        type: Number,
        require: true

    }


})
// partySchema.pre('save', async function (next) {
//     console.log("pre func called")
//    this.partyName=this.partyName
//    this.Id=this.Id
//    }
//     next();
// })
const Party = mongoose.model('VOTE', partySchema)
module.exports = Party