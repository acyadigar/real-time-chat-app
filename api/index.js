const app = require("express")();
const server = require("http").createServer(app);
const options = {cors: {
  origin: process.env.ORIGIN_PORT || "http://localhost:8080",
  methods: ["GET", "POST"]
}}
const io = require("socket.io")(server, options);

const users = []

io.on("connection", socket => {

  socket.on('loggedIn', user => {
    socket.username = user
    users.push(socket)
    io.emit('loggedIn', users.map(user => user.username))
  })

  socket.on('chat message', message => {
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

server.listen(3000, () => {
  console.log('Server is listening!');
});