import { NextResponse } from "next/server";
import prisma from "@lib/prisma";
type ResponseType = {
  id: number;
  email: string;
};
export async function POST(request: Request) {
  const { email } = await request.json();
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email },
  });
  let response: ResponseType = { id: user.id, email: user.email };
  return NextResponse.json(response);
}
