"use client";
import { Navigation, Dashboard, Loading, Budget, User } from "@/components";
import { getCookie, hasCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Set height of screen
  // const setHeight = () => {
  //   const screenElement = document.getElementById("screen");
  //   if (screenElement) {
  //     screenElement.style.minHeight = window.innerHeight + "px";
  //   }
  // };
  // let deviceWidth = window.matchMedia("(max-width: 1024px)");
  // if (deviceWidth.matches) {
  //   window.addEventListener("resize", setHeight);
  //   setHeight();
  // }
  // useEffect(() => {
  //   setHeight();
  //   window.addEventListener("load", setHeight);
  //   return () => {
  //     window.removeEventListener("load", setHeight);
  //   };
  // }, []);

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
          ) : (
            <User />
          )}
          <div className="w-full h-16"></div>
          <Navigation handleNav={handleNav} />
        </div>
      )}
    </main>
  );
}
