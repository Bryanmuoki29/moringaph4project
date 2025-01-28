document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    // Connect to WebSocket
    socket.on('connect', () => {
        console.log('Connected to WebSocket server');
        socket.emit('join', { restaurant_id: '1234', user_id: 'user_001' });
    });

    // Handle incoming messages
    socket.on('message', (data) => {
        appendMessage(data.message, data.sender);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    // Send message
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            socket.emit('message', {
                message: message,
                restaurant_id: '1234',
                sender: 'user'
            });
            appendMessage(message, 'user');
            messageInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function appendMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
    }
});