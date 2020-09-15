const socket = io("http://localhost:3000");
const containerMessage = document.getElementById('message');
const formMessage = document.getElementById('send');
const messageInput = document.getElementById('message-input');
const sendMessage = document.getElementById('message-send');
const activeFriends = document.getElementById('friend-connected');
const dispname = document.getElementById("dispname")
const dispimage = document.getElementById("dispimage")

let userName = localStorage.getItem('dispName');
let userImage = localStorage.getItem('dispImage');
dispname.innerText = userName;
dispimage.src = userImage;

displayMessage("You Joined");
socket.emit("new-user", userName);
socket.emit('user-image', userImage);


socket.on("chat-messages", data =>{
    displayMessage(`${data.userName}: ${data.message}`);
})

socket.on("user-connected", userName =>{
    displayMessage(`${userName} connected`);
    activeFriend(userName)
})

socket.on("user-disconnected", userName =>{
    displayMessage(`${userName} disconnected`);
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
    container.innerHTML = message;
    containerMessage.appendChild(container);
}

function activeFriend(userName) {
    const friendName = document.createElement("li")
    friendName.innerText = userName;
    activeFriends.appendChild(friendName);
}
