import { db } from "@/db";
import { registrations } from "@/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { ensureDatabase } from "@/lib/bootstrap";
import { getAdminDashboardData, getStudentDashboardData } from "@/lib/queries";
import { makeId } from "@/lib/security";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role === "admin") return NextResponse.json({ registrations: (await getAdminDashboardData()).registrations });
  return NextResponse.json({ registrations: (await getStudentDashboardData(user.id)).myRegistrations });
}

export async function POST(request: NextRequest) {
  await ensureDatabase();
  const user = await getUserFromRequest(request);
  if (!user || user.role !== "student") return NextResponse.json({ error: "Student access required" }, { status: 403 });
  const body = await request.json();
  const [registration] = await db.insert(registrations).values({ id: makeId("reg"), userId: user.id, eventId: body.eventId, status: "pending", confirmationCode: `CC26-${Math.random().toString(36).slice(2, 8).toUpperCase()}` }).onConflictDoUpdate({ target: [registrations.userId, registrations.eventId], set: { status: "pending", updatedAt: sql`now()` } }).returning();
  return NextResponse.json({ registration }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const status = user.role === "admin" ? body.status : "cancelled";
  const [registration] = await db.update(registrations).set({ status, updatedAt: sql`now()` }).where(eq(registrations.id, body.id)).returning();
  return NextResponse.json({ registration });
}
