import { NextResponse } from "next/server";
import prisma from "@lib/prisma";
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
  const { id } = { id: 1 };
  const posts = await prisma.Post.findMany({
    where: { userId: id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}
