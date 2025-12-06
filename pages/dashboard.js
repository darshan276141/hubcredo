import Layout from "../components/Layout";
import styles from "../styles/dashboard.module.css";

export default function Dashboard() {
  return (
    <Layout>
      <div className={styles.header}>
        <h1 className={styles.title}>Hello, Priyadarshan 👋</h1>
        <p className={styles.subtitle}>Here is what&apos;s happening with your account today.</p>
      </div>

      {/* Stats Row */}
      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <p className={styles.cardLabel}>Total Projects</p>
          <h2 className={styles.cardValue}>12</h2>
        </div>
        
        <div className={styles.card}>
          <p className={styles.cardLabel}>Pending Tasks</p>
          <h2 className={styles.cardValue}>5</h2>
        </div>

        <div className={styles.card}>
          <p className={styles.cardLabel}>Hours Tracked</p>
          <h2 className={styles.cardValue}>34.5</h2>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className={styles.sectionTitle}>Recent Activity</h3>
        <div className={styles.activityCard}>
          
          <div className={styles.activityItem}>
            <div className={styles.itemLeft}>
              <span className={styles.itemTitle}>Project &quot;Alpha&quot; Created</span>
              <span className={styles.itemDesc}>You started a new repository</span>
            </div>
            <span className={styles.itemTime}>2 hrs ago</span>
          </div>

          <div className={styles.activityItem}>
            <div className={styles.itemLeft}>
              <span className={styles.itemTitle}>Invoice #1024 Paid</span>
              <span className={styles.itemDesc}>Subscription renewed successfully</span>
            </div>
            <span className={styles.itemTime}>1 day ago</span>
          </div>

          <div className={styles.activityItem}>
            <div className={styles.itemLeft}>
              <span className={styles.itemTitle}>Profile Updated</span>
              <span className={styles.itemDesc}>You changed your avatar</span>
            </div>
            <span className={styles.itemTime}>2 days ago</span>
          </div>

        </div>
      </div>
    </Layout>
  );
}