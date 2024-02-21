import { NextResponse } from "next/server";
const NodeCache = require("node-cache");
import { Resend } from "resend";
import prisma from "@lib/prisma";
const jwt = require("jsonwebtoken");
import { cookies } from "next/headers";
const resend = new Resend(process.env.RESENDAPIKEY);
const memjs = require("memjs");
import mailContentGenerator from "app/components/functions/emailmarkdown";
const otpCache = memjs.Client.create(process.env.MEMCACHIER_SERVERS, {
  failover: true,
  timeout: 1,
  keepAlive: true,
});
export async function POST(request) {
  const { email } = await request.json();
  const username = email.split("@")[0];
  otpCache.set(email, otpVal(), { expires: 300 }, function (err, val) {
    if (err) {
      console.log("error setting otp value", err);
    }
  });
  const otp = otpCache.get(email, function (err, val) {
    if (err) {
      console.log("error getting otp value", err);
    }
    console.log("otp value and email while creating", val.toString(), email);
    return val.toString();
  });
  // console.log("otpval", otp);

  if (otp) {
    const resultString = mailContentGenerator(otp);

    try {
      resend.emails.send({
        from: "dev@joeljgeorge.tech",
        to: "joeljoby111@gmail.com",
        subject: `Hello ${username}`,
        html: resultString,
      });
    } catch (e) {
      console.log("error while sending mail", e);
    }
    console.log("email sent");
    return NextResponse.json({ status: "ok" });
  } else {
    return NextResponse.json({ status: "fail" });
  }
}
export async function PUT(request, response) {
  const { email, otp } = await request.json();
  // console.log("email and otp", email, otp);
  const otpValue = await new Promise((resolve, reject) => {
    otpCache.get(email, function (err, val) {
      if (err) {
        console.log("error getting otp value", err);
        reject(err);
      } else {
        console.log(
          "otp value and email while verifying",
          val.toString(),
          email
        );
        resolve(val.toString());
      }
    });
  });

  console.log("otpval in verification", otpValue);
  if (otpValue == otp) {
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
