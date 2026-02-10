import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    user: "ankit",
    email: "ankit123@gmail.com",
  });
}

export function POST() {
  return NextResponse.json({
    user: "ankit",
    email: "ankit123@gmail.com",
  });
}

