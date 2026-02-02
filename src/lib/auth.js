import { jwtVerify, SignJWT } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const KEY = new TextEncoder().encode(JWT_SECRET);

export async function signToken(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(KEY);
}

export async function verifyToken(token) {
    try {
        const { payload } = await jwtVerify(token, KEY);
        return payload;
    } catch (error) {
        return null;
    }
}
