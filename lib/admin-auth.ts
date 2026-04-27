import { SignJWT, jwtVerify } from "jose";
import * as bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "secret");
const ADMIN_TOKEN_EXPIRY = 7 * 24 * 60 * 60;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function generateAdminToken(adminId: string): Promise<string> {
  return new SignJWT({ adminId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(Math.floor(Date.now() / 1000) + ADMIN_TOKEN_EXPIRY)
    .sign(secret);
}

export async function verifyAdminToken(token: string): Promise<string | null> {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload.adminId as string;
  } catch {
    return null;
  }
}

export async function setAdminCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: ADMIN_TOKEN_EXPIRY,
  });
}

export async function clearAdminCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
}

export async function getAdminFromToken(token: string) {
  const adminId = await verifyAdminToken(token);
  if (!adminId) return null;
  return db.adminUser.findUnique({ where: { id: adminId } });
}

export async function getAuthenticatedAdmin(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const tokenMatch = cookieHeader.match(/admin_token=([^;]+)/);
  if (!tokenMatch) return null;

  return getAdminFromToken(tokenMatch[1]);
}
