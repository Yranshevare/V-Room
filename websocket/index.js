import express from "express";
import { createServer } from "node:http";
import path from "path";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);

app.use(
    cors({
        origin: "http://localhost:3000", // frontend origin
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.use(express.static(path.resolve("./public")));

// ✅ Configure CORS for socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // frontend URL
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });

    // Listen for messages
    socket.on("message", ({ roomId, message }) => {
        console.log(`Message in ${roomId}:`, message);

        // Emit only to people in that room
        io.to(roomId).emit("message", message);
    });
});

const port = 4000;

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
