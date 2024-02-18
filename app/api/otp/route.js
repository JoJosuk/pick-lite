import { NextResponse } from "next/server";
const NodeCache = require("node-cache");
import { Resend } from "resend";
import prisma from "@lib/prisma";
const jwt = require("jsonwebtoken");
import { cookies } from "next/headers";
const resend = new Resend(process.env.RESENDAPIKEY);
import mailContentGenerator from "app/components/functions/emailmarkdown";
const otpDict = new NodeCache();
export async function POST(request) {
  const { email } = await request.json();
  const username = email.split("@")[0];
  const otp = otpVal();
  if (otpDict.set(email, otp, 320)) {
    console.log(otpDict.get(email));
  }
  const resultString = mailContentGenerator(otp);
  resend.emails.send({
    from: "dev@joeljgeorge.tech",
    to: "joeljoby111@gmail.com",
    subject: `Hello ${username}`,
    html: resultString,
  });
  console.log("email sent");
  return NextResponse.json({ status: "ok" });
}
export async function PUT(request, response) {
  const { email, otp } = await request.json();
  console.log(otpDict.get(email));
  if (otpDict.get(email) == otp) {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "4h",
      }
    );
    console.log(token);
    const response = NextResponse.json({ status: "success" });
    response.cookies.set("token", token, {
      maxAge: 60 * 60 * 4,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return response;
  }
  return NextResponse.json({ status: "fail" });
}
const otpVal = () => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
