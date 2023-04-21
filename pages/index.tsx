import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen">
      <h1 className="font-bold text-3xl capitalize">
        hello welcome to my frontend mentor hub
      </h1>
    </div>
  );
}
