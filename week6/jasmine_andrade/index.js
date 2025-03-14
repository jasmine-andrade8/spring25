const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('chat message', 'Go bears!')
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    socket.emit('chat message', 'typing...')
    console.log('message: ' + msg);
    
  });
});



io.on('connection', (socket) => {
  socket.broadcast.emit('Go bears!!!!');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});