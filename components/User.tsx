"use client";
import { deleteCookie, getCookie } from "cookies-next";
import { Button } from "@/components";
import { useRouter } from "next/navigation";

export default function User() {
  const router = useRouter();

  const handleSignOut = () => {
    deleteCookie("uid");
    deleteCookie("name");
    deleteCookie("email");
    deleteCookie("photo");
    router.push("/login");
  };

  return (
    <main id="screen" className="bg-slate-950 relative font-head">
      <div id="container" className="p-5">
        <h1 className="text-sm text-slate-500">{getCookie("name")}</h1>
        <h1 className="text-2xl text-white">User Settings</h1>
        <Button title="Sign Out" handleClick={handleSignOut} styles="mt-10" />
      </div>
    </main>
  );
}
