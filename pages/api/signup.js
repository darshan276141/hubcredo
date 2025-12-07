import clientPromise from '../../lib/mongodb'
import bcrypt from 'bcrypt'
import { signToken } from '../../lib/auth'
import axios from 'axios'
import cookie from 'cookie'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  
  const { email, password, fullName } = req.body || {}
  
  if (!email || !password) return res.status(400).json({ error: 'email and password required' })

  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB || 'mydb')
  const users = db.collection('users')

  const existing = await users.findOne({ email: email.toLowerCase() })
  if (existing) return res.status(400).json({ error: 'User already exists' })

  const saltRounds = 10
  const hash = await bcrypt.hash(password, saltRounds)

  const now = new Date()
  const newUser = {
    email: email.toLowerCase(),
    password: hash,
    fullName: fullName || "Unknown User", // Fallback if name missing
    createdAt: now
  }

  const result = await users.insertOne(newUser)
  const userId = result.insertedId

  const token = signToken({ sub: userId.toString(), email: newUser.email })
  res.setHeader('Set-Cookie', cookie.serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 
  }))

  // --- DEBUGGING N8N ---
  const n8nUrl = process.env.N8N_SIGNUP_WEBHOOK
  
  console.log("------------------------------------------------")
  console.log("DEBUG: Attempting to trigger n8n...")
  console.log("DEBUG: URL is:", n8nUrl) // CHECK IF THIS IS UNDEFINED IN TERMINAL
  
  if (n8nUrl) {
    axios.post(n8nUrl, { 
      id: userId.toString(), 
      email: newUser.email, 
      fullName: newUser.fullName, 
      createdAt: now 
    })
    .then(() => console.log("DEBUG: n8n Success! Webhook fired."))
    .catch(err => console.error('DEBUG: n8n FAILED:', err.message))
  } else {
    console.error("DEBUG: N8N_SIGNUP_WEBHOOK is missing in .env file!")
  }
  console.log("------------------------------------------------")
  // ---------------------

  return res.status(201).json({ ok: true })
}