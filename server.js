const io = require('socket.io')(3000)

//Every time a user loads up the site, it will call this function.
io.on('connection', socket => {
  console.log('New user connected')
  socket.emit('chat-message', 'Hello World')
})