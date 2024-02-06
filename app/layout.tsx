import "./globals.css";
import type { Metadata } from "next";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Cash Compass",
  description: "Income tracking and fund allocation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="manifest" href="/public/manifest.json" />
      <body suppressHydrationWarning={true}>
        {/* <Navbar /> */}
        <div className="hidden sm:block">
          Cashout is currently only available on Mobile
        </div>
        <div className="sm:hidden">
          <StoreProvider children={children} />
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
