const app = require("express")();
const server = require("http").createServer(app);
const options = {
  cors: {
    origin: process.env.ORIGIN_PORT || "http://localhost:8080",
    methods: ['GET', 'POST']
  }
}
const io = require("socket.io")(server, options);

require('./database/mongo-connection')
const DbHandler = require('./database/db')

const users = []

io.on("connection", async (socket) => {
  const messages = await DbHandler.findMessages()

  socket.on('loggedIn', user => {
    socket.username = user
    users.push(socket)
    io.emit('loggedIn', {users:users.map(user => user.username), messages})
  })

  socket.on('chat message', async (message) => {
    await DbHandler.saveMessage(message)
    socket.broadcast.emit('chat message', message)
  })

  socket.on('typing', user => {
    socket.broadcast.emit('typing', user)
  })

  socket.on('disconnect', () => {
    io.emit('userLeft', socket.username)
    users.splice(users.indexOf(socket), 1)
  })
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening!');
});