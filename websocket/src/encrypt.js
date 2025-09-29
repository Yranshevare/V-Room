
import crypto from "crypto";

export async function encrypt(data) {
    return crypto.createHmac('sha256', process.env.ENCRYPT_SECRET ).update(data).digest('hex');
}

// export async function decrypt(token: string) {
//     const data = jwt.verify(token, process.env.JWT_SECRET );
//     return data;
// }