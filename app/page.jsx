import Image from "next/image";
import { BackgroundBeams } from "./components/ui/background-beams";

export default function Home() {
  return (
    <main>
      <div className="w-screen min-h-screen bg-black h-screen flex justify-center items-center ">
        <div className="lg:w-1/2 bg-white p-4 z-50 rounded-xl">
          <div className="flex justify-center">
            <Image src="pick.svg" width={114} height={87} alt="hello" />
          </div>
          <h1 className="text-black">LOGIN</h1>
        </div>
      </div>
      <BackgroundBeams />
    </main>
  );
}
