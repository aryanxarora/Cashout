"use client";

// import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import { Navigation } from "@/components";
import Image from "next/image";
import { useEffect } from "react";

export default function Budget() {
  const user = getCookie("uid");
  const router = useRouter();

  if (user === "") router.push("/login");

  const handleSignOut = () => {
    deleteCookie("uid");
    router.push("/login");
  };

  // Set height of screen
  const setHeight = () => {
    const screenElement = document.getElementById("screen");
    if (screenElement) {
      screenElement.style.minHeight = window.innerHeight + "px";
    }
  };
  let deviceWidth = window.matchMedia("(max-width: 1024px)");
  if (deviceWidth.matches) {
    window.addEventListener("resize", setHeight);
    setHeight();
  }
  useEffect(() => {
    setHeight();
    window.addEventListener("load", setHeight);
    return () => {
      window.removeEventListener("load", setHeight);
    };
  }, []);

  return (
    <main id="screen" className="bg-slate-950 relative font-head">
      <div id="container" className="p-5">
        <h1 className="text-sm text-slate-500">Monthly Allocation</h1>
        <h1 className="text-2xl text-white">Summary</h1>
      </div>
      <Navigation />
    </main>
  );
}
