import client from "@/lib/db.connection";
import response from "@/lib/response";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    try {
        const UserName = req.nextUrl.searchParams.get("userName") as string;
        const roomName = req.nextUrl.searchParams.get("roomName") as string;
        const roomCode = req.nextUrl.searchParams.get("roomCode") as string;

        await client.hDel(`${roomCode+roomName}:users`, UserName);

        return response({ message: "Success", status: 200 });
        
    } catch (error) {
        return response({ message: "Internal Server Error", status: 500, data: { error } });
    }
}