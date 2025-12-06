import Layout from "../components/Layout";
import styles from "../styles/settings.module.css";

export default function Settings() {
  return (
    <Layout>
      <div className={styles.container}>
        
        <h1 className={styles.header}>User Settings</h1>

        {/* Profile Info */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Profile Information</h3>

          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
            <input className={styles.input} defaultValue="Admin User" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input className={styles.input} type="email" defaultValue="admin@example.com" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Age</label>
            <input className={styles.input} type="number" defaultValue="22" />
          </div>
        </div>

        {/* Security */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Security</h3>

          <div className={styles.formGroup}>
            <label className={styles.label}>Current Password</label>
            <input className={styles.input} type="password" placeholder="••••••••" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>New Password</label>
            <input className={styles.input} type="password" />
          </div>
        </div>

        {/* Buttons */}
        <div className={styles.actions}>
          <button className={styles.saveButton}>Save Changes</button>
          <button className={styles.logoutButton}>Logout</button>
        </div>

      </div>
    </Layout>
  );
}
