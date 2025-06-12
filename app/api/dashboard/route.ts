// app/api/users/route.ts
import { getDipa } from "@/app/lib/dashboard/getDipa";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const data = await getDipa();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
