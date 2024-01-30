"use client";
import {
  Navigation,
  Dashboard,
  Loading,
  Budget,
  User,
  Logger,
} from "@/components";
import { getCookie, hasCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addNewUser, getUserData } from "./firebase/functions";
import { BudgetState } from "@/types";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<BudgetState>();

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

  useEffect(() => {
    const uid = getCookie("uid");
    const dataHandler = async () => {
      const data = await getUserData(uid || "");
      if (data !== null) {
        setData(data as BudgetState);
        return !null;
      } else {
        return null;
      }
    };

    dataHandler().then((data) => {
      if (data === null) {
        addNewUser(uid || "").then(() => {
          getUserData(uid || "").then((data) => {
            setData(data as BudgetState);
          });
        });
      }
    });
  }, []);

  if (!data) return null;
  return (
    <main id="screen" className="bg-slate-950 min-h-screen h-auto relative">
      {loading ? (
        <Loading styles="h-screen" />
      ) : (
        <div>
          {nav === "home" ? (
            <Dashboard data={data} />
          ) : nav === "budget" ? (
            <Budget />
          ) : nav == "user" ? (
            <User />
          ) : (
            <Logger data={data} />
          )}
          <div className="w-full h-16"></div>
          <Navigation handleNav={handleNav} />
        </div>
      )}
    </main>
  );
}
