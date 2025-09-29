import client from "@/lib/db.connection";
import { encrypt } from "@/lib/encrypt";
import response from "@/lib/response";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    try {
        const UserName = req.nextUrl.searchParams.get("userName") as string;
        const roomName = req.nextUrl.searchParams.get("roomName") as string;
        const roomCode = req.nextUrl.searchParams.get("roomCode") as string;

        const roomId = await encrypt(roomCode + roomName);
        const hashedUserName = await encrypt(UserName);

        await client.hDel(`${roomId}`, hashedUserName);

        return response({ message: "Success", status: 200 });
        
    } catch (error) {
        return response({ message: "Internal Server Error", status: 500, data: { error } });
    }
}