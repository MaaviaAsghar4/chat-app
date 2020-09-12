const socket = io("http://localhost:3000");
const containerMessage = document.getElementById('message');
const formMessage = document.getElementById('send');
const messageInput = document.getElementById('message-input');
const sendMessage = document.getElementById('message-send');
const activeFriends = document.getElementById('friend-connected');

const name = prompt("Enter Your Name");
displayMessage("You Joined");
socket.emit("new-user", name);



socket.on("chat-messages", data =>{
    displayMessage(`${data.name}: ${data.message}`);
})

socket.on("user-connected", name =>{
    displayMessage(`${name} connected`);
    activeFriend(name)
})

socket.on("user-disconnected", name =>{
    displayMessage(`${name} disconnected`);
})

formMessage.addEventListener("submit", e => {
    e.preventDefault();
    const message = messageInput.value;
    displayMessage(`You: ${message}`)
    socket.emit("send-message", message);
    messageInput.value = ''
})

function displayMessage(message) {
    const container = document.createElement("div");
    container.setAttribute("class", "message-list")
    container.innerText = message;
    containerMessage.appendChild(container);
}

function activeFriend(name) {
    const friendName = document.createElement("li")
    friendName.innerText = name;
    activeFriends.appendChild(friendName);
}
