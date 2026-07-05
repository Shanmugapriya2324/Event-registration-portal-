import { getUserFromRequest } from "@/lib/auth";
import { getRegistrationExportRows } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

function csvCell(value: unknown) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request);
  if (user?.role !== "admin") return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  const rows = await getRegistrationExportRows();
  const header = ["Registration ID", "Confirmation Code", "Status", "Registered At", "Full Name", "Register Number", "Email", "Mobile", "College", "Department", "Event", "Event Date", "Venue"];
  const csv = [header.map(csvCell).join(","), ...rows.map((row) => [row.registrationId, row.confirmationCode, row.status, row.registeredAt, row.fullName, row.registerNumber, row.email, row.mobileNumber, row.collegeName, row.department, row.eventName, row.eventDate, row.venue].map(csvCell).join(","))].join("\n");
  return new NextResponse(csv, { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": "attachment; filename=codecraze-registrations.csv" } });
}
