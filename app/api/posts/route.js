import { NextResponse } from "next/server";
import prisma from "@lib/prisma";
import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");
// type RequestBody = {
//   id: number;
//   title: string;
//   description: string;
//   link: string;
//   tags: string[];
//   userId: number;
// };
export async function POST(request) {
  const { id, title, description, link, tags, userId } = await request.json();
  await prisma.Post.upsert({
    where: { id },
    update: { title, description, link, tags, userId },
    create: { title, description, link, tags, userId },
  });
  return NextResponse.json({ status: "ok" });
}

export async function DELETE(request) {
  const { id } = await request.json();
  await prisma.Post.delete({ where: { id } });
  return NextResponse.json({ status: "ok" });
}

export async function GET(request) {
  try {
    const token = request.cookies.get("token");
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    const id = decoded.id;
    const posts = await prisma.Post.findMany({
      where: { userId: id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ status: "fail" });
  }
}
