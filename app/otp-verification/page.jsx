"use client";
import Image from "next/image";
import { BackgroundBeams } from "../components/ui/background-beams";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

export default function OtpPage() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const handleSubmitClick = async () => {
    const email = Cookies.get("user");
    const options = {
      method: "put",
      url: "/api/otp",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        otp,
      },
    };
    const response = await axios(options);
    if (response.data.status === "success") {
      router.push("/dashboard");
    } else {
      alert("Wrong OTP");
    }
  };
  useEffect(() => {
    const user = Cookies.get("user");
    if (!user) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main>
      <div className="w-screen min-h-screen bg-black  flex justify-center items-center ">
        <div className="lg:w-1/2 bg-white p-4 z-50 rounded-xl pt-10 aspect-[3/2] flex flex-col space-y-4">
          <div className="flex justify-center">
            <Image src="pick.svg" width={100} height={80} alt="hello" />
          </div>
          <h1 className="text-black font-ishtok font-medium text-3xl text-center p-2">
            Pick-lite ➕
          </h1>
          <div className="flex justify-center py-8">
            <div className="relative w-2/3 min-w-[200px] h-10 border rounded-md focus-within:border-t-0">
              <input
                className="peer w-full h-full text-black bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Enter the One Time Password
              </label>
            </div>
          </div>
          <div className="flex justify-center p-10">
            <button
              onClick={handleSubmitClick}
              className="px-12 py-4 rounded-full bg-[#F59E0B] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[rgb(255,193,85)] transition-colors duration-200"
            >
              Log IN
            </button>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </main>
  );
}
