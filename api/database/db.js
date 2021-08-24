const MessageModel = require('./message')

class DbHandler {
  async saveMessage(message) {
    return MessageModel.create(message)
  }

  async findMessages() {
    return MessageModel.find()
  }
}

module.exports = new DbHandler()