//Get the socket variable from the socket host location
const socket = io('http://localhost:3000')

socket.on('chat-message', data => {
  console.log(data)
})