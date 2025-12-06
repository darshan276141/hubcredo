import Layout from "../components/Layout";
import styles from "../styles/dashboard.module.css";

export default function Dashboard() {
  return (
    <Layout>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Welcome to your Dashboard!!</h1>
            <p className={styles.date}>Saturday, Dec 06, 2025</p>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <p className={styles.statTitle}>Total Users</p>
            <h2 className={styles.statValue}>1,248</h2>
            <span className={`${styles.statChange} ${styles.positive}`}>+12.5%</span>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statTitle}>Active Sessions</p>
            <h2 className={styles.statValue}>84</h2>
            <span className={`${styles.statChange} ${styles.positive}`}>+5.2%</span>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statTitle}>Server Load</p>
            <h2 className={styles.statValue}>34%</h2>
            <span className={`${styles.statChange} ${styles.negative}`}>High</span>
          </div>

          <div className={styles.statCard}>
            <p className={styles.statTitle}>Revenue (Today)</p>
            <h2 className={styles.statValue}>$4,302</h2>
            <span className={`${styles.statChange} ${styles.positive}`}>+8%</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomGrid}>

          {/* Recent Activity */}
          <div className={styles.largeCard}>
            <h3 className={styles.cardHeader}>Recent Activity</h3>
            <ul className={styles.activityList}>
              <li className={styles.activityItem}>
                <div>
                  <p className={styles.user}>Alice Johnson</p>
                  <p className={styles.action}>Upgraded to Pro Plan</p>
                </div>
                <p className={styles.time}>2 min ago</p>
              </li>

              <li className={styles.activityItem}>
                <div>
                  <p className={styles.user}>Mark Smith</p>
                  <p className={styles.action}>Created project &quot;Alpha&quot;</p>
                </div>
                <p className={styles.time}>15 min ago</p>
              </li>

              <li className={styles.activityItem}>
                <div>
                  <p className={styles.user}>System Bot</p>
                  <p className={styles.action}>Backup completed</p>
                </div>
                <p className={styles.time}>1 hr ago</p>
              </li>

              <li className={styles.activityItem}>
                <div>
                  <p className={styles.user}>Sarah Lee</p>
                  <p className={styles.action}>Login from new IP</p>
                </div>
                <p className={styles.time}>3 hrs ago</p>
              </li>
            </ul>
          </div>

          {/* System Status */}
          <div className={styles.largeCard}>
            <h3 className={styles.cardHeader}>System Health</h3>

            <div className={styles.statusRow}>
              <span>Database</span>
              <span className={styles.statusIndicator}><span className={`${styles.dot} ${styles.online}`}></span> Online</span>
            </div>

            <div className={styles.statusRow}>
              <span>API Gateway</span>
              <span className={styles.statusIndicator}><span className={`${styles.dot} ${styles.online}`}></span> Online</span>
            </div>

            <div className={styles.statusRow}>
              <span>Email Service</span>
              <span className={styles.statusIndicator}><span className={`${styles.dot} ${styles.busy}`}></span> Latency</span>
            </div>

            <div className={styles.statusRow}>
              <span>Storage</span>
              <span className={styles.statusIndicator}><span className={`${styles.dot} ${styles.online}`}></span> 85% Free</span>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
