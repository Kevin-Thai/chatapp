//Contains all the client side javascript

//Get the socket variable from the socket host location
const socket = io('http://localhost:3000')
const msgContainer = document.getElementById('message-container')
const msgForm = document.getElementById('send-container')
const msgInput = document.getElementById('message-input')

//Change from prompt to a GET request when implemented with a database
//const user = prompt('Enter a username')
const user = 'temp'

appendMsg = msg => {
  const msgElement = document.createElement('div')
  msgElement.innerText = msg
  msgContainer.append(msgElement)
}

appendMsg('You have joined the chat')
socket.emit('user-join', user)

socket.on('user-connected', user => {
  appendMsg(`${user} has joined.`)
})

socket.on('user-disconnected', user => {
  appendMsg(`${user} has left.`)
})

socket.on('chat-message', data => {
  appendMsg(`${data.user}: ${data.msg}`)
})

msgForm.addEventListener('submit', e => {
  //Stops the page from submitting the form to the server and refreshing the page
  e.preventDefault()
  const msg = msgInput.value
  socket.emit('send-chat-msg', msg)
  appendMsg(`You: ${msg}`)
  msgInput.value = ''
})