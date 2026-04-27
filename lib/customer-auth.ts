import { SignJWT, jwtVerify } from "jose";
import * as bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "secret");
const CUSTOMER_TOKEN_EXPIRY = 30 * 24 * 60 * 60; // 30 days

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function generateCustomerToken(userId: string): Promise<string> {
  return new SignJWT({ userId, type: "customer" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(Math.floor(Date.now() / 1000) + CUSTOMER_TOKEN_EXPIRY)
    .sign(secret);
}

export async function verifyCustomerToken(token: string): Promise<string | null> {
  try {
    const verified = await jwtVerify(token, secret);
    if (verified.payload.type !== "customer") return null;
    return verified.payload.userId as string;
  } catch {
    return null;
  }
}

export async function setCustomerCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("customer_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: CUSTOMER_TOKEN_EXPIRY,
    path: "/",
  });
}

export async function clearCustomerCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("customer_token");
}

export async function getCustomerFromToken(token: string) {
  const userId = await verifyCustomerToken(token);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

export async function getAuthenticatedCustomer(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const tokenMatch = cookieHeader.match(/customer_token=([^;]+)/);
  if (!tokenMatch) return null;

  return getCustomerFromToken(tokenMatch[1]);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
