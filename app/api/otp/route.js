import { NextResponse } from "next/server";
const NodeCache = require("node-cache");
import { Resend } from "resend";
const crypto = require("crypto");
const resend = new Resend(process.env.RESENDAPIKEY);
const otpDict = new NodeCache();
export async function POST(request) {
  const { email } = await request.json();
  const otp = otpVal();
  if (otpDict.set(email, otp, 320)) {
    console.log(otpDict.get(email));
  }
  const resultString = `<p> hello your OTP for email verification is </p> <h1>${otp}</h1>`;
  resend.emails.send({
    from: "dev@joeljgeorge.tech",
    to: "joeljoby111@gmail.com",
    subject: "Hello World",
    html: resultString,
  });
  console.log("email sent");
  return NextResponse.json({ status: "ok" });
}
export async function PUT(request) {
  const { email, otp } = await request.json();
  console.log(otpDict.get(email));
  if (otpDict.get(email) == otp) {
    return NextResponse.json({ status: "success" });
  }
  return NextResponse.json({ status: "fail" });
}
const otpVal = () => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
