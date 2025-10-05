import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import client from "./redisConnection.js";
import { encrypt } from "./encrypt.js";
import { createAdapter } from "@socket.io/redis-adapter";

const app = express();
const server = createServer(app);

app.use(
    cors({
        origin: "*", // frontend origin
        methods: ["GET", "POST"],
        credentials: true,
    })
);

// ✅ Configure CORS for socket.io
const io = new Server(server, {
    cors: {
        origin: "*", // frontend origin
        methods: ["GET", "POST"],
        credentials: true,
    },
});

const pubClient = client.duplicate();
const subClient = client.duplicate();

await pubClient.connect();
await subClient.connect();

io.adapter(createAdapter(pubClient, subClient));

io.on("connection", async (socket) => {
    console.log("a user connected", socket.id);

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);

        const users = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        io.to(roomId).emit("UserCount", users.length);
    });

    socket.on("disconnecting", async () => {
        const rooms = Array.from(socket.rooms);
        for (const room of rooms) {
            if (room !== socket.id) {
                const users = Array.from(io.sockets.adapter.rooms.get(room) || []);
                if (users.length - 1 === 0) {
                    console.log(`Room ${room} is now empty`);
                    const actualRoomId = await encrypt(room);
                    await client.del(actualRoomId);
                }else{
                    const userCount = await client.hLen(room);
                }
                io.to(room).emit("UserCount", users.length - 1);
            }
        }
    });

    // Listen for messages
    socket.on("message", async ({ roomId, message }) => {
        console.log(`Message in ${roomId}:`, message);
        const actualRoomId = await encrypt(roomId);
        // reset the expiry time
        await client.expire(`${actualRoomId}`, 60 * 30);

        // Emit only to people in that room
        io.to(roomId).emit("message", message);
    });
});

const port = 4000;

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
