"use client";
import { BackgroundBeams } from "../components/ui/background-beams";
import NavbarNext from "../components/NavbarNext";
export default function Dashboard() {
  return (
    <>
      <div className="w-screen min-h-screen bg-black">
        <NavbarNext />
        <h1>Dashboard</h1>
      </div>
      <BackgroundBeams />
    </>
  );
}
