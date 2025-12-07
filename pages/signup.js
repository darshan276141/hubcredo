import { useState } from "react";
import styles from "../styles/auth.module.css";
import Link from "next/link";

export default function Signup() {
  const [fullName, setFullName] = useState(""); // <--- NEW STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // SEND FULL NAME HERE
      body: JSON.stringify({ fullName, email, password }), 
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
      <div className={styles.leftPane}>
        <div className={styles.welcomeText}>
          <h1>Join Us Today</h1>
          <p>Create an account to start managing your workflow.</p>
        </div>
      </div>

      <div className={styles.rightPane}>
        <form className={styles.formContainer} onSubmit={handleSignup}>
          
          <div>
            <h2 className={styles.title}>Create Account</h2>
          </div>

          {error && <p style={{color: "red", fontSize: "0.9rem"}}>{error}</p>}

          {/* --- NEW FULL NAME INPUT --- */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Full Name</label>
            <input 
              className={styles.input} 
              type="text" 
              placeholder="John Doe"
              required
              onChange={(e) => setFullName(e.target.value)} 
            />
          </div>
          {/* --------------------------- */}

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

          <button className={styles.button} type="submit">Sign Up</button>
          <p className={styles.footer}>
            Already have an account? <Link href="/login" className={styles.link}>Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}