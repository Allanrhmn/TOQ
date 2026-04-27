import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
async function getOrder(id: string) {
  return db.order.findUnique({
    where: { id },
    include: { user: true, items: { include: { product: true } } },
  });
}

export default async function AdminOrderDetail({
  params,
}: {
  params: { id: string };
}) {
  const order = await getOrder(params.id);

  if (!order) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Order {order.orderNumber}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold mb-4">Order Status</h2>
            <div className="flex gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <p className="text-lg font-bold capitalize">{order.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Payment</p>
                <p className="text-lg font-bold capitalize">
                  {order.paymentStatus}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold mb-4">Customer Information</h2>
            <p className="mb-2">
              <span className="text-gray-600">Name: </span>
              {order.user?.name || order.guestEmail || "Guest"}
            </p>
            <p className="mb-2">
              <span className="text-gray-600">Email: </span>
              {order.user?.email || order.guestEmail}
            </p>
            <p>
              <span className="text-gray-600">Phone: </span>
              {order.guestPhone || order.user?.phone || "N/A"}
            </p>
          </div>

          {/* Items */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between border-b pb-4">
                  <div>
                    <p className="font-semibold">{item.product.title}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">{item.price} DKK</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg p-6 shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4 border-b pb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">{order.subtotal} DKK</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">{order.shippingCost} DKK</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-semibold">{order.tax} DKK</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{order.discountAmount} DKK</span>
              </div>
            )}
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{order.total} DKK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
