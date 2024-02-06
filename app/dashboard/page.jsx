"use client";
import { BackgroundBeams } from "../components/ui/background-beams";
import NavbarNext from "../components/NavbarNext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function Dashboard() {
  const router = useRouter();
  const options = {
    method: "get",
    url: "/api/auth",
    headers: {
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/auth", options);
      const data = await response.json();
      console.log(data);
      if (data.status === "fail") {
        router.push("/");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="w-screen min-h-screen bg-black">
        <NavbarNext />
      </div>
      <BackgroundBeams />
    </>
  );
}
