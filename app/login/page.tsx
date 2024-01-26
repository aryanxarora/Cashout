"use client";

import { Button } from "@/components";
import { auth, provider } from "@/app/firebase/config";
import { signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import favicon from "@/app/favicon.ico";
import Image from "next/image";
import hero from "@/public/hero.png";

const Start = () => {
  const router = useRouter();

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      if (data) {
        console.log(data);
        setCookie("uid", data.user.uid || "");
        setCookie("name", data.user.displayName || "");
        setCookie("email", data.user.email || "");
        setCookie("photo", data.user.photoURL || "");
        setCookie("nav", "home");
        router.push("/");
      }
    });
  };

  useEffect(() => {
    if (getCookie("uid")) {
      router.push("/");
    }
  }, []);

  return (
    <div>
      <div
        id="screen"
        className="p-10 font-sans flex flex-col bg-slate-950 h-auto"
      >
        <div>
          <div className="flex items-center gap-10">
            <Image src={favicon} alt="" width={40} />
            <h1 className="text-2xl text-white font-bold my-5">
              cash compass.
            </h1>
          </div>
          <h1 className="text-3xl leading-tight my-10 text-white">
            Income tracking and fund allocation
          </h1>
          <p className="text-gray-400 text-md">
            Streamline your finances with an intuitive app. Easily log income,
            and let Cashout smartly allocate it to categories like allowance,
            savings, and investments.
          </p>
        </div>
        <Button title="Get Started" handleClick={handleClick} styles="mt-10" />
      </div>
      <Image src={hero} alt="cash compass" className="w-full" />
    </div>
  );
};

export default Start;
