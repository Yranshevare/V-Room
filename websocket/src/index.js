import express from "express";
import { createServer } from "node:http";
import path from "path";
import { Server } from "socket.io";
import cors from "cors";
import client from "./redisConnection.js";

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

        const users = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        io.to(roomId).emit("UserCount", users.length);
    });

    socket.on("disconnecting", async() => {
        const rooms = Array.from(socket.rooms);
        for (const room of rooms) {
            if (room !== socket.id) {
                const users = Array.from(io.sockets.adapter.rooms.get(room) || []);
                if(users.length -1 === 0){
                    console.log(`Room ${room} is now empty`);
                    await client.del(room);
                    await client.del(`${room}:users`);
                }
                io.to(room).emit("UserCount", users.length - 1);
            }
        }
    })

    // Listen for messages
    socket.on("message", async ({ roomId, message }) => {
        console.log(`Message in ${roomId}:`, message);
        // reset the expiry time
        await client.expire(`${roomId}`, 60*30);
        await client.expire(`${roomId}:users`, 60*30);

        // Emit only to people in that room
        io.to(roomId).emit("message", message);
    });
});

const port = 4000;

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
