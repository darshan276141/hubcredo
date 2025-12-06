import cookie from 'cookie'


export default async function handler(req, res) {
res.setHeader('Set-Cookie', cookie.serialize('token', '', {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: 'lax',
path: '/',
maxAge: 0
}))
return res.status(200).json({ ok: true })
}