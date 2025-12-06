import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
// import { verifyToken } from "../../lib/auth"; // If you have a verify helper, use it.

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("test"); // Make sure this matches your DB name

    // 1. GET USER ID FROM COOKIE/SESSION
    // This part depends on how you store auth. 
    // Usually, we verify the JWT token from the cookie here.
    // For now, I will assume you send the userId in the body or header, 
    // OR ideally, you decode the cookie here.
    
    // *If you are using the same logic as api/me.js, copy that verification here*
    // For this example, I will assume the client sends the ID or email to identify themselves
    // (In production, ALWAYS derive ID from the HTTP-only cookie for security)
    
    const { email, name, password, currentEmail } = req.body;

    // 2. PREPARE UPDATE DATA
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    // If you want to update password, you should hash it first! 
    // const hashedPassword = await hash(password);
    // if (password) updateData.password = hashedPassword;

    // 3. UPDATE MONGODB
    // We update based on the current email (assuming email is unique)
    const result = await db.collection("users").updateOne(
      { email: currentEmail }, 
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Profile updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}