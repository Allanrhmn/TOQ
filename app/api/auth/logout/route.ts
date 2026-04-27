import { NextRequest, NextResponse } from "next/server";
import { clearCustomerCookie } from "@/lib/customer-auth";

export async function POST(_request: NextRequest) {
  try {
    await clearCustomerCookie();

    return NextResponse.json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}
