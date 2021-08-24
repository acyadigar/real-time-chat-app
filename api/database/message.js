const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  username: String,
  message: String,
  date: {
    type: Date,
    default: Date.now
  }
})

const MessageModel = mongoose.model('Message', MessageSchema)

module.exports = MessageModel