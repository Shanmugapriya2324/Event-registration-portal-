import { db } from "@/db";
import { events, registrations, users } from "@/db/schema";
import { getUserFromRequest } from "@/lib/auth";
import { ensureDatabase } from "@/lib/bootstrap";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await ensureDatabase();
  const user = await getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id") ?? "";
  const [row] = await db.select({ registration: registrations, event: events, participant: users }).from(registrations).innerJoin(events, eq(events.id, registrations.eventId)).innerJoin(users, eq(users.id, registrations.userId)).where(user.role === "admin" ? eq(registrations.id, id) : and(eq(registrations.id, id), eq(registrations.userId, user.id))).limit(1);
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const text = `CodeCraze 2026 Registration Confirmation\n\nParticipant: ${row.participant.fullName}\nRegister No: ${row.participant.registerNumber}\nEvent: ${row.event.name}\nDate: ${row.event.eventDate} ${row.event.startTime}\nVenue: ${row.event.venue}\nStatus: ${row.registration.status}\nConfirmation Code: ${row.registration.confirmationCode}\n\nPlease carry your college ID card to the event venue.`;
  return new NextResponse(text, { headers: { "content-type": "text/plain; charset=utf-8", "content-disposition": `attachment; filename=${row.registration.confirmationCode}.txt` } });
}
