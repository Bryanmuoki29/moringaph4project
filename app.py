from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('join')
def handle_join(data):
    restaurant_id = data['restaurant_id']
    user_id = data['user_id']
    print(f'User {user_id} joined restaurant chat {restaurant_id}')
    # In production, validate user access to this restaurant chat

@socketio.on('message')
def handle_message(data):
    restaurant_id = data['restaurant_id']
    message = data['message']
    sender = data['sender']
    
    # In production: 
    # 1. Validate message
    # 2. Store message in database
    # 3. Add timestamp
    # 4. Handle different message types
    
    print(f'Message received in room {restaurant_id}: {message}')
    emit('message', {
        'message': message,
        'sender': sender,
        'restaurant_id': restaurant_id
    }, room=restaurant_id)

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)