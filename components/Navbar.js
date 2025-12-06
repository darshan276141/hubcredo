import styles from "../styles/layout.module.css";

export default function Navbar() {

  return (
    <nav className={styles.navbar}>
      <h2 className={styles.logo}>My SaaS</h2>

      <button
        className={styles.themeToggle}
        onClick={() => {
          const cur = document.documentElement.getAttribute("data-theme");
          document.documentElement.setAttribute(
            "data-theme",
            cur === "dark" ? "light" : "dark"
          );
        }}
      >
        🌗
      </button>
    </nav>
  );
}
