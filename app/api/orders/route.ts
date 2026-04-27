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
    const {
      cartItems,
      shippingAddress,
      billingAddress,
      paymentMethod,
      discountCode,
    } = body;

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { error: "Shipping address is required" },
        { status: 400 }
      );
    }

    if (!paymentMethod) {
      return NextResponse.json(
        { error: "Payment method is required" },
        { status: 400 }
      );
    }

    let discountData = null;
    let discountAmount = 0;

    if (discountCode) {
      const discount = await db.discount.findUnique({
        where: { code: discountCode },
      });

      if (!discount || !discount.isActive) {
        return NextResponse.json(
          { error: "Invalid or expired discount code" },
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

      discountData = discount;
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of cartItems) {
      const product = await db.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.title}` },
          { status: 400 }
        );
      }

      const price = product.salePrice || product.price;
      const itemTotal = price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: price,
      });
    }

    if (discountData) {
      if (discountData.type === "percentage") {
        discountAmount = (subtotal * discountData.amount) / 100;
      } else {
        discountAmount = discountData.amount;
      }
    }

    const tax = subtotal * 0.25;
    const shippingCost = subtotal > 500 ? 0 : 50;
    const total = subtotal + tax + shippingCost - discountAmount;

    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const order = await db.order.create({
      data: {
        orderNumber,
        userId: user.id,
        subtotal,
        tax,
        shippingCost,
        discountAmount,
        total,
        status: "pending",
        paymentStatus: "unpaid",
        paymentMethod,
        shippingAddress,
        billingAddress: billingAddress || shippingAddress,
        discountId: discountData?.id,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (discountData) {
      await db.discount.update({
        where: { id: discountData.id },
        data: { usedCount: discountData.usedCount + 1 },
      });
    }

    for (const item of cartItems) {
      const product = await db.product.findUnique({
        where: { id: item.productId },
      });

      if (product) {
        await db.product.update({
          where: { id: item.productId },
          data: { stock: product.stock - item.quantity },
        });
      }
    }

    const cart = await db.cart.findFirst({
      where: { userId: user.id },
    });

    if (cart) {
      await db.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    return NextResponse.json(
      {
        message: "Order created successfully",
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          total: order.total,
          status: order.status,
          items: order.items,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
