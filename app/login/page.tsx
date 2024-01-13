"use client";

import { Button } from "@/components";
import { auth, provider } from "@/app/firebase/config";
import { signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

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

  return (
    <div>
      <div className="p-10 font-sans flex flex-col justify-between gap-44">
        <div>
          <h1 className="text-2xl font-bold my-5">cashout.</h1>
          <h1 className="text-5xl leading-tight my-10">
            Income tracking and fund allocation
          </h1>
          <p className="text-gray-400">
            Streamline your finances with an intuitive app. Easily log income,
            and let Cashout smartly allocate it to categories like allowance,
            savings, and investments.
          </p>
        </div>
        <Button title="Get Started" handleClick={handleClick} />
      </div>
    </div>
  );
};

export default Start;
