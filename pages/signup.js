import { useState } from "react";
import styles from "../styles/auth.module.css";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Signup failed");
      return;
    }

    window.location.href = "/dashboard"; 
  }

  return (
    <div className={styles.splitScreen}>
      
      {/* Left Design Side */}
      <div className={styles.leftPane}>
        <div className={styles.welcomeText}>
          <h1>Join Us Today</h1>
          <p>
            Create an account to start managing your workflow 
            with our powerful tools and analytics.
          </p>
        </div>
      </div>

      {/* Right Form Side */}
      <div className={styles.rightPane}>
        <form className={styles.formContainer} onSubmit={handleSignup}>
          
          <div>
            <h2 className={styles.title}>Create Account</h2>
            <p className={styles.subtitle}>Get started with your free account</p>
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
              placeholder="Create a strong password"
              required
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button className={styles.button} type="submit">
            Sign Up
          </button>

          <p className={styles.footer}>
            Already have an account? <Link href="/login" className={styles.link}>Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}