import { Start } from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="hidden sm:block">
        Cashout is currently only available on Mobile
      </div>
      <div className="sm:hidden">
        <Start />
      </div>
    </main>
  );
}
