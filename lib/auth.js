import jwt from 'jsonwebtoken'


const SECRET = process.env.JWT_SECRET
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'


if (!SECRET) throw new Error('Missing JWT_SECRET')


export function signToken(payload) {
return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN })
}


export function verifyToken(token) {
try {
return jwt.verify(token, SECRET)
} catch (err) {
    console.error("JWT verify error:", err);
return null
}
}