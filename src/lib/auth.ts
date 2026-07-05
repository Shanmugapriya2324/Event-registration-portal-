import { db } from "@/db";
import { users, type User } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { ensureDatabase } from "./bootstrap";
import { createToken, verifyToken } from "./security";

export const sessionCookieName = "codecraze_session";

export async function setSession(user: Pick<User, "id" | "role" | "email" | "fullName">) {
  const cookieStore = await cookies();
  const role = user.role === "admin" ? "admin" : "student";
  cookieStore.set(sessionCookieName, createToken({ sub: user.id, role, email: user.email, name: user.fullName }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);
}

export async function getCurrentUser() {
  await ensureDatabase();
  const cookieStore = await cookies();
  const payload = verifyToken(cookieStore.get(sessionCookieName)?.value);
  if (!payload) return null;
  const [user] = await db.select().from(users).where(eq(users.id, payload.sub)).limit(1);
  return user ?? null;
}

export async function requireUser(role?: "student" | "admin") {
  const user = await getCurrentUser();
  if (!user) return null;
  if (role && user.role !== role) return null;
  return user;
}

export async function getUserFromRequest(request: NextRequest) {
  await ensureDatabase();
  const payload = verifyToken(request.cookies.get(sessionCookieName)?.value);
  if (!payload) return null;
  const [user] = await db.select().from(users).where(eq(users.id, payload.sub)).limit(1);
  return user ?? null;
}
