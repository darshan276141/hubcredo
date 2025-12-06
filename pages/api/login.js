import clientPromise from '../../lib/mongodb'
import bcrypt from 'bcrypt'
import { signToken } from '../../lib/auth'
import cookie from 'cookie'


export default async function handler(req, res) {
if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
const { email, password } = req.body || {}
if (!email || !password) return res.status(400).json({ error: 'email and password required' })


const client = await clientPromise
const db = client.db(process.env.MONGODB_DB || 'mydb')
const users = db.collection('users')


const user = await users.findOne({ email: email.toLowerCase() })
if (!user) return res.status(401).json({ error: 'Invalid credentials' })


const match = await bcrypt.compare(password, user.password)
if (!match) return res.status(401).json({ error: 'Invalid credentials' })


const token = signToken({ sub: user._id.toString(), email: user.email })
res.setHeader('Set-Cookie', cookie.serialize('token', token, {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: 'lax',
path: '/',
maxAge: 60 * 60 * 24 * 7
}))


return res.status(200).json({ ok: true })
}