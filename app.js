'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = 5000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(5000, () => console.log(`Listening on 5000`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));

  /**
  *    When we receive a 'message' event from our client, print out
  *   the contents of that message and then echo it back to our client
  *   using `io.emit()`
  */

  socket.on('message', (message) => {
      console.log("Message Received: " + message);
      io.emit('message', {type: 'new-message', text: message});
  });
});
