import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();
export async function POST(req: NextRequest) {
  const data = await req.json();
  await prismaClient.user.create({
    data: {
      username: data.username,
      password: data.password,
    },
  });
  console.log(data);
  return NextResponse.json({
    message: "you have been signed up ",
  });
}
