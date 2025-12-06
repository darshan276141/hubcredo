"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar"; // Import the sidebar
import styles from "../styles/layout.module.css"; // Import the layout styles

export default function Layout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const publicRoutes = ["/login", "/signup", "/"];
    
    async function checkAuth() {
      if (publicRoutes.includes(router.pathname)) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch("/api/me");
        if (!res.ok) throw new Error("Not auth");
        setLoading(false);
      } catch (err) {
        router.push("/login");
      }
    }

    checkAuth();
  }, [router.pathname, router]);

  if (loading) return <div style={{padding: "20px"}}>Loading...</div>;

  // Don't show Sidebar on Login/Signup pages
  if (["/login", "/signup"].includes(router.pathname)) {
    return <>{children}</>;
  }

  return (
    <div className={styles.mainWrapper}>
      <Sidebar />
      <main className={styles.contentArea}>
        {children}
      </main>
    </div>
  );
}