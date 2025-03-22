const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//new mongoose stuff
const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  content: {type: String}
})

const messageModel = mongoose.model("Message", messageSchema)

console.log(messageModel)

//end new mongoose stuff

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, async function() {
  await mongoose.connect("mongodb+srv://jasmineandrade8:<db_password>@cluster0.bcmxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  const messages = await messageModel.find();
  console.log("Messages:", messages)
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.emit('chat message', 'Go bears!'))
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    const message = new messageModel();
    message.content = msg;
    message.save().then(m => {
      io.emit('chat message', msg)
    })
    socket.emit('chat message', 'typing...')
    console.log('message: ' + msg);
    
  });
});





io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// mongodb+srv://jasmineandrade8:<db_password>@cluster0.bcmxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

