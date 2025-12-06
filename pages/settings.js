import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import styles from "../styles/settings.module.css";
import { useRouter } from "next/router";

export default function Settings() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // State for form fields
  const [user, setUser] = useState({
    name: "",
    email: "",
    // We keep a separate field for the original email to identify the user in DB
    originalEmail: "" 
  });

  // 1. Fetch current user data on load
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          setUser({
            name: data.name || "",
            email: data.email || "",
            originalEmail: data.email || ""
          });
        }
      } catch (err) {
        console.error("Failed to load user", err);
      }
    }
    fetchUser();
  }, []);

  // 2. Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Save Function
  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentEmail: user.originalEmail, // Used to find the user in DB
          name: user.name,
          email: user.email,
        }),
      });

      if (res.ok) {
        setMessage("✅ Settings saved successfully!");
        // Update original email in case they changed it
        setUser((prev) => ({ ...prev, originalEmail: prev.email }));
      } else {
        setMessage("❌ Failed to save changes.");
      }
    } catch (error) {
      setMessage("❌ Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.header}>Settings</h1>

        {message && <p style={{marginBottom: "15px", fontWeight: "bold"}}>{message}</p>}

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Profile Details</h3>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
            <input 
              className={styles.input} 
              name="name"
              value={user.name} 
              onChange={handleChange}
              type="text" 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <input 
              className={styles.input} 
              name="email"
              value={user.email} 
              onChange={handleChange}
              type="email" 
            />
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Security</h3>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>New Password</label>
            <input className={styles.input} type="password" placeholder="Leave blank to keep current" />
          </div>

          <button 
            className={styles.saveButton} 
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </Layout>
  );
}