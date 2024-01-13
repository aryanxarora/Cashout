"use client";

// import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import { Navigation, DashboardChart } from "@/components";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
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

  const handleLogger = () => {
    console.log(getCookie("uid"));
  };

  return (
    <main id="screen" className="bg-slate-950 relative font-head">
      <div id="container" className="p-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Image
              src={getCookie("photo") || ""}
              width={50}
              height={50}
              alt="Picture of the author"
              className="rounded-full ring-lime-500 ring-2"
            />
            <div>
              <h1 className="text-sm text-slate-500">Cashout</h1>
              <h1 className="text-white">{getCookie("name")}</h1>
            </div>
          </div>
          <button onClick={handleLogger}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 stroke-white stroke-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
        <h1 className="mt-5 text-2xl text-white">Overview</h1>
        <div className="w-full bg-slate-800 rounded-xl">
          hello
          <DashboardChart />
        </div>
      </div>
      <Navigation />
    </main>
  );
}
