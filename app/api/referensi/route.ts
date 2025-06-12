// app/api/users/route.ts

import { getKanwil } from "@/app/lib/referensi/getKanwil";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const data = await getKanwil();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
