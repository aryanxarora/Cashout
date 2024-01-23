"use client";
import {
  Navigation,
  Dashboard,
  Loading,
  Budget,
  User,
  Logger,
} from "@/components";
import { hasCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (hasCookie("uid") && loading) {
      setLoading(false);
    } else {
      router.push("/login");
    }
  }, []);

  const [nav, setNav] = useState<string>("home");
  const handleNav = (option: string) => {
    setNav(option);
  };

  return (
    <main id="screen" className="bg-slate-950 min-h-screen h-auto relative">
      {loading ? (
        <Loading styles="h-screen" />
      ) : (
        <div>
          {nav === "home" ? (
            <Dashboard />
          ) : nav === "budget" ? (
            <Budget />
          ) : nav == "user" ? (
            <User />
          ) : (
            <Logger />
          )}
          <div className="w-full h-16"></div>
          <Navigation handleNav={handleNav} />
        </div>
      )}
    </main>
  );
}
