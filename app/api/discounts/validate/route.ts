import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, subtotal } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Discount code is required" },
        { status: 400 }
      );
    }

    const discount = await db.discount.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!discount) {
      return NextResponse.json(
        { error: "Invalid discount code" },
        { status: 404 }
      );
    }

    if (!discount.isActive) {
      return NextResponse.json(
        { error: "Discount code is inactive" },
        { status: 400 }
      );
    }

    if (discount.expiresAt && new Date() > discount.expiresAt) {
      return NextResponse.json(
        { error: "Discount code has expired" },
        { status: 400 }
      );
    }

    if (discount.maxUses && discount.usedCount >= discount.maxUses) {
      return NextResponse.json(
        { error: "Discount code usage limit exceeded" },
        { status: 400 }
      );
    }

    if (discount.minPurchase && subtotal < discount.minPurchase) {
      return NextResponse.json(
        {
          error: `Minimum purchase of ${discount.minPurchase} DKK required`,
        },
        { status: 400 }
      );
    }

    let discountAmount = 0;
    if (discount.type === "percentage") {
      discountAmount = (subtotal * discount.amount) / 100;
    } else {
      discountAmount = discount.amount;
    }

    return NextResponse.json({
      valid: true,
      discount: {
        code: discount.code,
        type: discount.type,
        amount: discount.amount,
        discountAmount: parseFloat(discountAmount.toFixed(2)),
      },
    });
  } catch (error) {
    console.error("Discount validation error:", error);
    return NextResponse.json(
      { error: "Failed to validate discount code" },
      { status: 500 }
    );
  }
}
