import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedCustomer } from "@/lib/customer-auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedCustomer(request);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "orderId is required" },
        { status: 400 }
      );
    }

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (order.userId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (order.paymentStatus === "paid") {
      return NextResponse.json(
        { error: "Order already paid" },
        { status: 400 }
      );
    }

    const mobilepayApiKey = process.env.MOBILEPAY_API_KEY;
    const mobilepayMerchantId = process.env.MOBILEPAY_MERCHANT_ID;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!mobilepayApiKey || !mobilepayMerchantId || !baseUrl) {
      console.error("MobilePay configuration missing");
      return NextResponse.json(
        { error: "Payment gateway not configured" },
        { status: 500 }
      );
    }

    const paymentData = {
      orderId: order.id,
      amount: Math.round(order.total * 100),
      currency: "DKK",
      reference: order.orderNumber,
      description: `Order ${order.orderNumber}`,
      redirectUrl: `${baseUrl}/checkout/success`,
      cancelUrl: `${baseUrl}/checkout/cancel`,
    };

    await db.order.update({
      where: { id: orderId },
      data: {
        metadata: paymentData,
      },
    });

    const mockPaymentUrl = `https://mobilepay-sandbox.dk/pay/${order.id}?amount=${order.total}&reference=${order.orderNumber}`;

    return NextResponse.json({
      paymentUrl: mockPaymentUrl,
      orderId: order.id,
      amount: order.total,
      currency: "DKK",
      reference: order.orderNumber,
      message: "MobilePay integration - Using mock URL for development. Replace with actual MobilePay API integration.",
    });
  } catch (error) {
    console.error("MobilePay session error:", error);
    return NextResponse.json(
      { error: "Failed to create payment session" },
      { status: 500 }
    );
  }
}
