import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const subtotal = request.nextUrl.searchParams.get("subtotal");

    const discount = await db.discount.findUnique({
      where: { code: params.code.toUpperCase() },
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

    let discountAmount = 0;
    if (subtotal) {
      const subtotalNum = parseFloat(subtotal);
      if (discount.minPurchase && subtotalNum < discount.minPurchase) {
        return NextResponse.json(
          {
            error: `Minimum purchase of ${discount.minPurchase} DKK required`,
          },
          { status: 400 }
        );
      }

      if (discount.type === "percentage") {
        discountAmount = (subtotalNum * discount.amount) / 100;
      } else {
        discountAmount = Math.min(discount.amount, subtotalNum);
      }
    }

    return NextResponse.json({
      valid: true,
      discount: {
        code: discount.code,
        type: discount.type,
        amount: discount.amount,
        minPurchase: discount.minPurchase,
        discountAmount: subtotal ? parseFloat(discountAmount.toFixed(2)) : null,
      },
    });
  } catch (error) {
    console.error("Get discount error:", error);
    return NextResponse.json(
      { error: "Failed to fetch discount" },
      { status: 500 }
    );
  }
}
