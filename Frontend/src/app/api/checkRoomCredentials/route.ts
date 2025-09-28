import response from "@/lib/response";
import { NextRequest } from "next/server";
import client from "@/lib/db.connection";
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
    try {
        const { userName, roomName, roomCode } = await req.json();

        const existingRoom = await client.hGetAll(`${roomCode+roomName}`);

        if (Object.keys(existingRoom).length !== 0) {
            return response({ message: "Room already exists", status: 400 });
        }
        const hashedRoomCode = await bcrypt.hash(roomCode, Number(process.env.BCRYPT_HASH_ROUND));

        await client.hSet(`${roomCode+roomName}`, { code: hashedRoomCode });
        await client.hSet(`${roomCode+roomName}:users`,  userName, "1" );

        await client.expire(`${roomCode+roomName}`, 60*30);
        await client.expire(`${roomCode+roomName}:users`, 60*30);

        return response({ message: "Success", status: 200 });
    } catch (error) {
        response({ message: "Internal Server Error", status: 500, data: { error } });
    }
}
