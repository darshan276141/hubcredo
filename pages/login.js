import { useState } from "react";
import styles from "../styles/auth.module.css";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", 
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <div className={styles.splitScreen}>
      
      {/* Left Design Side */}
      <div className={styles.leftPane}>
        <div className={styles.welcomeText}>
          <h1>Welcome Back!</h1>
          <p>
            Log in to access your dashboard, manage your projects, 
            and track your analytics in real-time.
          </p>
        </div>
      </div>

      {/* Right Form Side */}
      <div className={styles.rightPane}>
        <form className={styles.formContainer} onSubmit={handleLogin} autoComplete="off">
          
          <div>
            <h2 className={styles.title}>Log in</h2>
            <p className={styles.subtitle}>Enter your credentials to access your account</p>
          </div>

          {error && <p style={{color: "red", fontSize: "0.9rem"}}>{error}</p>}

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <input
              className={styles.input}
              type="email"
              placeholder="name@company.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="••••••••"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className={styles.button} type="submit">
            Sign In
          </button>

          <p className={styles.footer}>
            Don&apos;t have an account? <Link href="/signup" className={styles.link}>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}