const express = require("express");
const path = require("path");
const http = require("http");

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname+"/public")));

io.on("connection", function(socket){
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + "joined the conversation");
    });
    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + "lefy the conversation");
    });
    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
    });
});

console.log('Server Running');
server.listen(5000); 