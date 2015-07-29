var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/*
var pg = require('pg'); //http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#postgres-setup
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
var client = new pg.Client(connectionString);
client.connect();
*/

//var mongoose = require('mongoose');
//var MessageSchema = new mongoose.Schema({});
//mongoose.model('Message', MessageSchema);


//Master-relay: http://stackoverflow.com/a/9688972/1181387


app.get('/', function(req, res){
  res.sendFile('index.html', { root: __dirname });
});
app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
	  console.log('disconnected');
  });
  socket.on('new message', function(msg){console.log("MESSAGE: ",msg);});
  socket.on('chat msg', function(msg){
	  console.log("MESSAGE: ", msg);
	  io.emit('chat msg', msg);
  });
  socket.on('clear', function(){
	  console.log("CLEARED")
	  io.emit('clear');
  });
});

/*https://stackoverflow.com/questions/17287330/socket-io-handling-disconnect-event
	var allClients = [];
	io.sockets.on('connection', function(socket) {
	   allClients.push(socket);

	   socket.on('disconnect', function() {
		  console.log('Got disconnect!');

		  var i = allClients.indexOf(socket);
		  delete allClients[i];
	   });
	});*/

http.listen(process.env.PORT || 3000, function(){ //Heroku dynamically assigns port http://stackoverflow.com/a/15693371
  console.log('listening on *:' + (process.env.PORT || 3000));
});
