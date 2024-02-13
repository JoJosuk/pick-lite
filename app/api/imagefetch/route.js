import cheerio from "cheerio";
import axios from "axios";
import { NextResponse } from "next/server";
const puppeteer = require("puppeteer");
export async function POST(request) {
  try {
    const { link } = await request.json();
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
      $('meta[property^="og:"]').each(function () {
        const property = $(this).attr("property");
        const content = $(this).attr("content");
        const propertyName = property.replace("og:", "");
        ogpMetadata[propertyName] = content;
      });

      if (ogpMetadata.image) {
        return NextResponse.json(ogpMetadata);
      } else {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(link);
        const image = await page.screenshot();
        await browser.close();
        return NextResponse.json(image);
      }
    } else {
      return NextResponse.json({
        status: "fail",
        message: "Response is not HTML",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: "fail",
      message: "An error occurred",
      error,
    });
  }
}
