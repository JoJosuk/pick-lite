import { NextResponse } from "next/server";
const NodeCache = require("node-cache");
import { Resend } from "resend";
const crypto = require("crypto");
const resend = new Resend(process.env.RESENDAPIKEY);
const otpDict = new NodeCache();
export async function POST(request) {
  const { email } = await request.json();
  //   resend.emails.send({
  //     from: "onboarding@",
  //     to: "anzjox@gmail.com",
  //     subject: "Hello World",
  //     html: "<p>sending your <strong>first email</strong>!</p>",
  //   });
  console.log("sended");
  const otp = otpVal();
  if (otpDict.set(email, otp, 320)) {
    return NextResponse.json({ status: "ok" });
    console.log(otpDict.get(email));
  }

  return NextResponse.json({ status: "not ok" });
}

const otpVal = () => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  console.log(result);
};
