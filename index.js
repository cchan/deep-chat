var pg = require('pg');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile('index.html', { root: __dirname });
});
app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
	  console.log('disconnected');
  });
  socket.on('chat msg', function(msg){
	  console.log("MESSAGE:");
	  console.log(msg);
	  io.emit('chat msg', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
