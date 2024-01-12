"use client";

// import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";

export default function Home() {
  // const [user] = useAuthState(auth);
  const user = getCookie("uid");
  const router = useRouter();

  if (user === "") router.push("/login");

  const handleSignOut = () => {
    deleteCookie("uid");
    router.push("/login");
  };

  return (
    <main>
      <div className="hidden sm:block">
        Cashout is currently only available on Mobile
      </div>
      <div className="sm:hidden">
        <h1>Dashboard</h1>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </main>
  );
}
