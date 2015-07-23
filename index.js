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

http.listen(process.env.PORT || 3000, function(){ //Heroku dynamically assigns port http://stackoverflow.com/a/15693371
  console.log('listening on *:3000');
});
