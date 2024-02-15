import "./globals.css";
import type { Metadata } from "next";
import StoreProvider from "./StoreProvider";
import favicon from "./favicon.ico";
import hero from "../public/hero.png";

export const metadata: Metadata = {
  title: "Cash Compass",
  description: "Income tracking and fund allocation",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {/* <Navbar /> */}
        <div className="hidden sm:block">
          <div className="bg-slate-950">
            <div className="">
              <div id="screen" className="p-10 font-sans flex flex-col  h-auto">
                <div>
                  <div className="flex items-center justify-center gap-10">
                    <img
                      src="https://raw.githubusercontent.com/aryanxarora/Cashout/main/app/favicon.ico"
                      alt=""
                      width={30}
                    />
                    <h1 className="text-lg text-slate-300 font-semibold my-5">
                      cash compass.
                    </h1>
                  </div>
                  <h1 className="text-4xl font-bold text-center leading-tight mt-10 text-white">
                    Income tracking and fund allocation
                  </h1>
                  <p className="text-gray-400 text-md text-center mt-5">
                    Streamline your finances. Easily log income, and let Cash
                    Compass smartly allocate it to categories
                  </p>
                </div>
                <div className="flex w-full justify-center mt-10">
                  <button className="rounded-full px-4 py-2 font-semibold bg-lime-500 hover:bg-opacity-90 animtate-smooth flex items-center group">
                    <span className="mr-2">
                      Cashout is currently only available on Mobile
                    </span>
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
              </div>
              <img
                src="https://raw.githubusercontent.com/aryanxarora/Cashout/main/public/hero.png"
                alt="cash compass"
                className="w-1/2"
              />
            </div>
            <div className="p-10">
              <p className="text-xs text-slate-600 text-center">
                © 2024 Cash Compass. All rights reserved. Any unauthorized use,
                reproduction, or distribution of this application or its content
                is strictly prohibited.
              </p>
            </div>
          </div>
        </div>
        <div className="sm:hidden">
          <StoreProvider children={children} />
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
