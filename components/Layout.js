"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const publicRoutes = ["/login", "/signup", "/"];

    async function checkAuth() {
      // If on public route → don't check auth
      if (publicRoutes.includes(router.pathname)) {
        setLoading(false);
        return;
      }

      // protected route
      const res = await fetch("/api/me", { credentials: "include" });

      if (!res.ok) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router.pathname, router]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
