// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose'); // Import mongoose to connect to MongoDB

// Initialize Express app
const app = express();
app.use(cors());

// MongoDB URI and PORT from environment variables
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5001;  // Default to 5001 if PORT is not defined

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const users = {}; // username -> socket.id
const socketToUsername = {}; // socket.id -> username

io.on('connection', (socket) => {
  socket.on('register', (username) => {
    users[username] = socket.id;
    socketToUsername[socket.id] = username;
    io.emit('user_list', Object.keys(users));
  });

  socket.on('private_message', ({ to, message }) => {
    const from = socketToUsername[socket.id];
    const targetSocket = users[to];
    if (targetSocket) {
      io.to(targetSocket).emit('receive_message', {
        from, message, type: 'private'
      });
    }
  });

  socket.on('join_group', (groupName) => {
    socket.join(groupName);
    const username = socketToUsername[socket.id];
    io.to(groupName).emit('receive_message', {
      from: 'System',
      message: `${username} joined group ${groupName}`,
      type: 'group',
      group: groupName
    });
  });

  socket.on('group_message', ({ group, message }) => {
    const from = socketToUsername[socket.id];
    io.to(group).emit('receive_message', {
      from, message, type: 'group', group
    });
  });

  // WebRTC signaling
  socket.on('call_user', ({ to, offer }) => {
    const from = socketToUsername[socket.id];
    const targetSocket = users[to];
    if (targetSocket) {
      io.to(targetSocket).emit('incoming_call', { from, offer });
    }
  });

  socket.on('answer_call', ({ to, answer }) => {
    const targetSocket = users[to];
    if (targetSocket) {
      io.to(targetSocket).emit('call_answered', { answer });
    }
  });

  socket.on('ice_candidate', ({ to, candidate }) => {
    const targetSocket = users[to];
    if (targetSocket) {
      io.to(targetSocket).emit('ice_candidate', { candidate });
    }
  });

  // ✅ Handle call disconnection
  socket.on('end_call', ({ to }) => {
    const targetSocket = users[to];
    if (targetSocket) {
      io.to(targetSocket).emit('call_ended');
    }
  });

  socket.on('disconnect', () => {
    const username = socketToUsername[socket.id];
    if (username) {
      // Notify all users (optional: notify only call target)
      const targetSocketId = users[username];
      if (targetSocketId) {
        io.to(targetSocketId).emit('call_ended');
      }
      delete users[username];
      delete socketToUsername[socket.id];
      io.emit('user_list', Object.keys(users));
    }
  });
});

// Start the server on the specified port from the environment variables
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
