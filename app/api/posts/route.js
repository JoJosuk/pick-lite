import { NextResponse } from "next/server";
import prisma from "@lib/prisma";
import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");
import cheerio from "cheerio";
import axios from "axios";
// type RequestBody = {
//   id: number;
//   title: string;
//   description: string;
//   link: string;
//   tags: string[];
//   userId: number;
// };
export async function POST(request) {
  let { id, title, description, link, imglink, tags } = await request.json();
  const token = request.cookies.get("token");
  const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
  const userId = decoded.id;
  console.log("title is  ", title, userId, imglink);
  if (imglink == "") {
    console.log("imglink is empty");
    try {
      const response = await axios.get(link);
      const contentType = response.headers["content-type"];
      if (contentType.startsWith("text/html")) {
        const htmlContent = response.data;
        const $ = cheerio.load(htmlContent);
        const ogpMetadata = {};
        const faviconUrl =
          $('link[rel="icon"]').attr("href") ||
          $('link[rel="shortcut icon"]').attr("href");
        ogpMetadata["favicon"] = faviconUrl;
        const ogImage = $('meta[property="og:image"]').attr("content");

        if (ogImage) {
          console.log("ogpMetadata.image");
          imglink = ogImage;
          console.log("imglink is ", imglink);
        } else if (faviconUrl) {
          console.log("faviconUrl");
          imglink = faviconUrl;
        }
      }
    } catch (e) {
      console.log("error is ", e);
    }
  }
  if (id) {
    await prisma.Post.upsert({
      where: { id },
      update: { title, description, link, tags, imglink, userId },
      create: { title, description, link, tags, imglink, userId },
    });
    return NextResponse.json({ status: "ok" });
  } else {
    try {
      await prisma.Post.create({
        data: { title, description, link, tags, imglink, userId },
      });
      return NextResponse.json({ status: "ok" });
    } catch {
      return NextResponse.json({ status: "fail" });
    }
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const token = request.cookies.get("token");
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    const user_id = decoded.id;
    await prisma.Post.delete({ where: { id: id, userId: user_id } });
    return NextResponse.json({ status: "ok" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: "fail" });
  }
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
