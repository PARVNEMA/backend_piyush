const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("/public/index.html");
});

io.on("connection", (socket) => {
    socket.on("user-message", (data) => {
        console.log("new message", data);
        io.emit("message", data);
    });
});
server.listen(8000, () => {
    console.log("server is running on port 8000");
});
