require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5001;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const users = new Map();         // socket.id -> username
const userSockets = new Map();   // username -> socket.id

io.on('connection', (socket) => {
  console.log(`🔌 Connected: ${socket.id}`);

  // Register new user
  socket.on('register', (username) => {
    users.set(socket.id, username);
    userSockets.set(username, socket.id);
    console.log(`✅ Registered: ${username}`);
    io.emit('user_list', Array.from(userSockets.keys()));
  });

  // Private messaging
  socket.on('private_message', ({ to, message }) => {
    const from = users.get(socket.id);
    const toSocketId = userSockets.get(to);
    if (toSocketId) {
      io.to(toSocketId).emit('receive_message', {
        from,
        message,
        type: 'private',
      });
    }
  });

  // Group chat
  socket.on('join_group', (groupName) => {
    socket.join(groupName);
    const username = users.get(socket.id);
    io.to(groupName).emit('receive_message', {
      from: 'System',
      message: `${username} joined group ${groupName}`,
      type: 'group',
      group: groupName
    });
  });

  socket.on('group_message', ({ group, message }) => {
    const from = users.get(socket.id);
    io.to(group).emit('receive_message', {
      from,
      message,
      type: 'group',
      group,
    });
  });

  // WebRTC signaling
  socket.on('call_user', ({ to, offer }) => {
    const from = users.get(socket.id);
    const toSocketId = userSockets.get(to);
    if (toSocketId) {
      console.log(`📞 ${from} is calling ${to}`);
      io.to(toSocketId).emit('incoming_call', { from, offer });
    }
  });

  socket.on('answer_call', ({ to, answer }) => {
    const toSocketId = userSockets.get(to);
    if (toSocketId) {
      console.log(`✅ Call answered by ${users.get(socket.id)}`);
      io.to(toSocketId).emit('call_answered', { answer });
    }
  });

  socket.on('ice_candidate', ({ to, candidate }) => {
    const toSocketId = userSockets.get(to);
    if (toSocketId) {
      io.to(toSocketId).emit('ice_candidate', { candidate });
    }
  });

  socket.on('end_call', ({ to }) => {
    const toSocketId = userSockets.get(to);
    if (toSocketId) {
      console.log(`🚫 Call ended by ${users.get(socket.id)}`);
      io.to(toSocketId).emit('call_ended');
    }
  });

  // Disconnect cleanup
  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    console.log(`❌ Disconnected: ${username || socket.id}`);
    if (username) {
      users.delete(socket.id);
      userSockets.delete(username);
      io.emit('user_list', Array.from(userSockets.keys()));
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
