"use client";
import Image from "next/image";
import { BackgroundBeams } from "../components/ui/background-beams";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import Loader from "../components/Loader";

export default function OtpPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [loader, setLoader] = useState(false);
  const buttonRef = useRef(null);
  const router = useRouter();

  const handleChange = (index, value) => {
    if (value.length == 1) {
      console.log("inside");
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 3) {
        refs[index + 1].current.focus();
      }
    } else if (value.length === 0) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  };
  const handleSubmitClick = async (e) => {
    e.preventDefault();
    buttonRef.current.disabled = true;
    setLoader(true);
    const Otptosend = otp.join("");
    const email = Cookies.get("user");
    const options = {
      method: "put",
      url: "/api/otp",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        otp: Otptosend,
      },
    };
    const response = await axios(options);
    if (response.data.status === "success") {
      router.push("/dashboard");
      setLoader(true);
    } else {
      alert("Wrong OTP");
      setLoader(false);
      buttonRef.current.disabled = false;
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    if (e.clipboardData.getData("text").length === 4) {
      setOtp(e.clipboardData.getData("text").split(""));
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
      <div className="z-50">{loader && <Loader />}</div>
      {!loader && (
        <div className="flex items-center justify-center w-screen min-h-screen bg-black ">
          <div className="lg:w-1/2 bg-white p-4 z-50 rounded-xl pt-10 aspect-[3/2] flex flex-col space-y-4">
            <div className="flex justify-center">
              <Image src="pick.svg" width={100} height={80} alt="hello" />
            </div>
            <h1 className="p-2 text-3xl font-medium text-center text-black font-ishtok">
              Pick-lite ➕
            </h1>
            <form onSubmit={handleSubmitClick} className="w-full">
              <div className="flex w-full gap-3 p-3 text-3xl text-center text-black">
                <input
                  type="text"
                  maxLength="1"
                  className="w-1/4 h-16 bg-white rounded-xl  border-[#F59E0B] border-2 text-center"
                  value={otp[0]}
                  ref={refs[0]}
                  onChange={(e) => {
                    handleChange(0, e.target.value);
                  }}
                  onPaste={handlePaste}
                />
                <input
                  type="text"
                  maxLength="1"
                  className="w-1/4 h-16 bg-white rounded-xl  border-[#F59E0B] border-2 text-center"
                  value={otp[1]}
                  ref={refs[1]}
                  onChange={(e) => {
                    handleChange(1, e.target.value);
                  }}
                  onPaste={handlePaste}
                />
                <input
                  type="text"
                  maxLength="1"
                  className="w-1/4 h-16 bg-white rounded-xl  border-[#F59E0B] border-2 text-center"
                  value={otp[2]}
                  ref={refs[2]}
                  onChange={(e) => {
                    handleChange(2, e.target.value);
                  }}
                  onPaste={handlePaste}
                />
                <input
                  type="text"
                  maxLength="1"
                  className="w-1/4 h-16 bg-white rounded-xl  border-[#F59E0B] border-2 text-center"
                  value={otp[3]}
                  ref={refs[3]}
                  onChange={(e) => {
                    handleChange(3, e.target.value);
                  }}
                  onPaste={handlePaste}
                />
              </div>
              <div className="flex justify-center p-10">
                <button
                  type="submit"
                  ref={buttonRef}
                  className="px-12 py-4 rounded-full bg-[#F59E0B] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[rgb(255,193,85)] transition-colors duration-200"
                >
                  Log IN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <BackgroundBeams />
    </main>
  );
}
