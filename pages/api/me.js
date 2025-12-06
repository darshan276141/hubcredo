import clientPromise from "../../lib/mongodb";
import { verifyToken } from "../../lib/auth";
import { ObjectId } from "mongodb";
import cookie from "cookie";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // parse cookie manually
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const data = verifyToken(token);
    if (!data) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "mydb");
    const users = db.collection("users");

    const user = await users.findOne(
      { _id: new ObjectId(data.sub) },
      { projection: { password: 0 } }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error("ME API error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
