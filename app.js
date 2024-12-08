const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const PORT = 3000;

const socket = require("socket.io");
const server = http.createServer(app);
const io = socket(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
    console.log("connected");
  });
  socket.on("disconnect", function () {
    io.emit("user-disconected", socket.id);
    console.log("User disconnected");
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(PORT, console.log(`server stated on ${PORT}`));
// server.listen(3000);
