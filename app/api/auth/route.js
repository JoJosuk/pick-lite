import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");
export async function GET(request) {
  const token = request.cookies.get("token");
  if (!token) {
    return NextResponse.json({ status: "fail" });
  }
  return NextResponse.json({ status: "success" });
  //   console.log(token);
  //   const decoded = jwt.verify(token.value, process.env.JWT_SECRET);

  //   return NextResponse.json(decoded);
}
