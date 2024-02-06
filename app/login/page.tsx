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

  const handleLogin = () => {
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
    <div className="bg-slate-950">
      <div id="screen" className="p-10 font-sans flex flex-col  h-auto">
        <div>
          <div className="flex items-center justify-center gap-10">
            <Image src={favicon} alt="" width={30} />
            <h1 className="text-lg text-slate-300 font-semibold my-5">
              cash compass.
            </h1>
          </div>
          <h1 className="text-3xl font-bold text-center leading-tight mt-10 text-white">
            Income tracking and fund allocation
          </h1>
          <p className="text-gray-400 text-md text-center mt-5">
            Streamline your finances. Easily log income, and let Cash Compass
            smartly allocate it to categories
          </p>
        </div>
        <div className="flex w-full justify-center mt-10">
          <button
            className="rounded-full px-4 py-2 font-semibold bg-lime-500 hover:bg-opacity-90 animtate-smooth flex items-center group"
            onClick={handleLogin}
          >
            <span className="mr-2">Sign in with Google</span>
            <svg
              className="stroke-current"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              aria-hidden="true"
            >
              <g>
                <path
                  className="opacity-0 group-hover:opacity-100 animate-short"
                  d="M0 5.5h7"
                ></path>
                <path
                  className="opacity-100 fill-transparent group-hover:transform group-hover:translate-x-1 animate-short"
                  d="M1 1l3 5-5 5"
                ></path>
              </g>
            </svg>
          </button>
        </div>
        {/* <Button title="Get Started" handleClick={handleClick} styles="mt-10" /> */}
      </div>
      <Image src={hero} alt="cash compass" className="w-full" />
      <div className="p-10">
        <p className="text-xs text-slate-600 text-center">
          © 2024 Cash Compass. All rights reserved. Any unauthorized use,
          reproduction, or distribution of this application or its content is
          strictly prohibited.
        </p>
      </div>
    </div>
  );
};

export default Start;
