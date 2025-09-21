import express from "express";
import { createServer } from "node:http";
import path from "path";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);

app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.static(path.resolve("./public")));

// ✅ Configure CORS for socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("message", (msg) => {
    console.log("message: " + JSON.stringify(msg, null, 2));
    io.emit("message", msg);
  });
});

const port = 4000;

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
