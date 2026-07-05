import { ensureDatabase } from "@/lib/bootstrap";
import { NextResponse } from "next/server";

export async function GET() {
  await ensureDatabase();
  return NextResponse.json({ ok: true, service: "CodeCraze 2026", database: "ready" });
}
