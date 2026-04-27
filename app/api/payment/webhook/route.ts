import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (!session.metadata?.orderId) {
          console.error("No orderId in session metadata");
          break;
        }

        const order = await db.order.findUnique({
          where: { id: session.metadata.orderId },
        });

        if (!order) {
          console.error("Order not found:", session.metadata.orderId);
          break;
        }

        await db.order.update({
          where: { id: session.metadata.orderId },
          data: {
            paymentStatus: "paid",
            status: "confirmed",
            transactionId: session.payment_intent as string,
          },
        });

        break;
      }

      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata?.orderId) {
          await db.order.update({
            where: { id: session.metadata.orderId },
            data: {
              paymentStatus: "paid",
              status: "confirmed",
              transactionId: session.payment_intent as string,
            },
          });
        }

        break;
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata?.orderId) {
          await db.order.update({
            where: { id: session.metadata.orderId },
            data: {
              paymentStatus: "failed",
              status: "cancelled",
            },
          });
        }

        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        const metadata = charge.metadata as Record<string, string>;

        if (metadata?.orderId) {
          const order = await db.order.findUnique({
            where: { id: metadata.orderId },
          });

          if (order) {
            await db.order.update({
              where: { id: metadata.orderId },
              data: {
                paymentStatus: "refunded",
                status: "refunded",
              },
            });

            const orderItems = await db.orderItem.findMany({
              where: { orderId: metadata.orderId },
            });

            for (const item of orderItems) {
              await db.product.update({
                where: { id: item.productId },
                data: {
                  stock: { increment: item.quantity },
                },
              });
            }
          }
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
