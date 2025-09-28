import client from "@/lib/db.connection";
import response from "@/lib/response";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req: NextRequest) {
    try {
        const roomCode = req.nextUrl.searchParams.get("roomCode") as string;
        const UserName = req.nextUrl.searchParams.get("userName") as string;
        const roomName = req.nextUrl.searchParams.get("roomName");
        console.log(roomCode);
        console.log(UserName);
        console.log(roomName);

        const existingRoom = await client.hGetAll(`${roomCode+roomName}`);
        if (Object.keys(existingRoom).length === 0) {
            return response({ message: "Room not exist", status: 400 });
        }


        const code = existingRoom.code;

        if(!roomCode || !roomCode){
            return response({ message: "Room code is not provided", status: 400 });
        }
        if(!await bcrypt.compare(roomCode, code)){
            return response({ message: "Room code is incorrect", status: 400 });
        }

        const existingUser = await client.hGet(`${roomCode+roomName}:users`, UserName );
        if (existingUser) {
            return response({ message: "User already exist, please use different name", status: 400 });
        }
        // console.log(existingUser);

        await client.hSet(`${roomCode+roomName}:users`,  UserName, "1" );

        return response({ message: "Success", status: 200 });
    } catch (error) {
        return response({ message: "Internal Server Error", status: 500, data: { error } });
    }
}
