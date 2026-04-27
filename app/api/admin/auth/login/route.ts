import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePassword, generateAdminToken, setAdminCookie } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const admin = await db.adminUser.findUnique({
      where: { email },
    });

    if (!admin || !(await comparePassword(password, admin.password))) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!admin.isActive) {
      return NextResponse.json(
        { error: "Admin account is inactive" },
        { status: 403 }
      );
    }

    const token = await generateAdminToken(admin.id);
    await setAdminCookie(token);

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
