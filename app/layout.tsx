import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cashout",
  description: "Income tracking and fund allocation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        <div className="hidden sm:block">
          Cashout is currently only available on Mobile
        </div>
        <div className="sm:hidden">{children}</div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
