import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const token = request.cookies.get("token");
    const response = NextResponse.json({ status: "ok" });
    response.cookies.set("token", "", {
      expires: new Date(0),
    });
    console.log("logout taking");
    return response;
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: "fail" });
  }
}
