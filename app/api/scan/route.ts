import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { url } = await req.json();

  const res = await fetch(`${process.env.BACKEND_URL}/scan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  return NextResponse.json(await res.json());
}
