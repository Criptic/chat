var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use("/public", express.static("public"));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.broadcast.emit("connection", "A user connected");
    socket.on('disconnect', function(){
      socket.broadcast.emit("connection", "A user disconnected");
    });
    socket.on('chat message', ({msg, user, dateTime}) => {
        if(msg != "" && msg != " " && user != "" && user != " ") {
            io.emit("chat message", {msg, user, dateTime});
        }
        console.log(msg);
      });
  });

  server.listen(3000, function(){
  console.log('listening on *:3000');
});