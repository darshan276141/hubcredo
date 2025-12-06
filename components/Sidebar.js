import Link from "next/link";
import styles from "../styles/layout.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/settings">Settings</Link>
      <Link href="/login">Logout</Link>
    </div>
  );
}
