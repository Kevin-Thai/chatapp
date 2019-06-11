const io = require('socket.io')(3000)

const users ={}

//Every time a user loads up the site, it will call this function.
io.on('connection', socket => {
  socket.on('user-join', user => {
    users[socket.id] = user
    socket.broadcast.emit('user-connected', user)
  })
  socket.on('send-chat-msg', msg => {
    socket.broadcast.emit('chat-message', { msg: msg, user: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})