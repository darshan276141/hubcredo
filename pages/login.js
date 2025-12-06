import { useState } from "react";
import styles from "../styles/auth.module.css";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // required for cookies
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Login failed");
      return;
    }

    // redirect on success
    window.location.href = "/dashboard";
  }



  return (
    <div className={styles.center}>
      <form className={styles.card} onSubmit={handleLogin}>
        <h2>Login</h2>

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
          Login
        </button>

        <p>Don&apos;t have an account? <Link href="/signup">Create one</Link></p>
      </form>
    </div>
  );
}