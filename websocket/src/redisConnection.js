import dotenv from 'dotenv'
import { createClient } from "redis";

dotenv.config({path:'./.env'}) 


const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});


client.on("error", (err) => console.log("Redis Client Error", err)); // Log connection errors

if (!client.isOpen) {        // Check if client is not already connected
    await client.connect();  // Connect to Redis server
}

export default client;