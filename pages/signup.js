import { useState } from "react";
import styles from "../styles/auth.module.css";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

async function handleSignup(e) {
  e.preventDefault();

  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Signup failed");
    return;
  }

  window.location.href = "/dashboard"; 
}


  return (
    <div className={styles.center}>
      <form className={styles.card} onSubmit={handleSignup}>
        <h2>Create Account</h2>

        <input 
          className={styles.input} 
          type="email" 
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} 
        />

        <input 
          className={styles.input}
          type="password" 
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button className={styles.button} type="submit">
          Sign Up
        </button>

        <p>Already have an account? <Link href="/login">Login</Link></p>
      </form>
    </div>
  );
}