import response from "@/lib/response";
import { NextRequest } from "next/server";
import client from "@/lib/db.connection";
import { encrypt } from "@/lib/encrypt";


export async function POST(req: NextRequest) {
    try {
        const { userName, roomName, roomCode } = await req.json();

        const roomId = await encrypt(roomCode + roomName);
        const hashedUserName = await encrypt(userName);

        const existingRoom = await client.hGetAll(`${roomId}`);

        if (Object.keys(existingRoom).length !== 0) {
            return response({ message: "Room already exists", status: 400 });
        }

        // await client.hSet(`${roomCode+roomName}`, { code: hashedRoomCode });
        await client.hSet(`${roomId}`,  hashedUserName, "1" );

        // await client.expire(`${roomCode+roomName}`, 60*30);
        await client.expire(`${roomId}`, 60*30);

        return response({ message: "Success", status: 200, data: { roomId } });
    } catch (error) {
        response({ message: "Internal Server Error", status: 500, data: { error } });
    }
}
