import crypto from "crypto";

export async function encrypt(data: string) {
    console.log(process.env.ENCRYPT_SECRET);
    return crypto.createHmac('sha256', process.env.ENCRYPT_SECRET as string).update(data).digest('hex');
}