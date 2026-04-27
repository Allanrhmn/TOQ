import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedAdmin } from "@/lib/admin-auth";
import { validateDiscountAmount } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(request);

    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      code,
      type,
      amount,
      minPurchase,
      maxUses,
      expiresAt,
    } = body;

    if (!code || !type || amount === undefined) {
      return NextResponse.json(
        { error: "code, type, and amount are required" },
        { status: 400 }
      );
    }

    if (!["percentage", "fixed"].includes(type)) {
      return NextResponse.json(
        { error: "type must be 'percentage' or 'fixed'" },
        { status: 400 }
      );
    }

    if (!validateDiscountAmount(amount, type)) {
      return NextResponse.json(
        { error: `Invalid amount for type '${type}'` },
        { status: 400 }
      );
    }

    const existingDiscount = await db.discount.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (existingDiscount) {
      return NextResponse.json(
        { error: "Discount code already exists" },
        { status: 409 }
      );
    }

    const discount = await db.discount.create({
      data: {
        code: code.toUpperCase(),
        type,
        amount,
        minPurchase: minPurchase || undefined,
        maxUses: maxUses || undefined,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
        isActive: true,
        usedCount: 0,
      },
    });

    return NextResponse.json(
      {
        message: "Discount created successfully",
        discount,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create discount error:", error);
    return NextResponse.json(
      { error: "Failed to create discount" },
      { status: 500 }
    );
  }
}
