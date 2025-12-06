import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/layout.module.css';

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call the logout API to clear cookies
      const res = await fetch('/api/logout', { method: 'POST' });
      
      if (res.ok) {
        router.push('/login');
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>MyApp</div>

      <nav className={styles.nav}>
        <Link 
          href="/dashboard" 
          className={`${styles.navItem} ${router.pathname === '/dashboard' ? styles.active : ''}`}
        >
          {/* You can add an SVG icon here if you want */}
          <span>Dashboard</span>
        </Link>

        <Link 
          href="/settings" 
          className={`${styles.navItem} ${router.pathname === '/settings' ? styles.active : ''}`}
        >
          <span>Settings</span>
        </Link>
      </nav>

      {/* Logout Button at the bottom */}
      <button onClick={handleLogout} className={`${styles.navItem} ${styles.logoutBtn}`}>
        <span>Logout</span>
      </button>
    </aside>
  );
}