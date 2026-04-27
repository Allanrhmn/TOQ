import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
async function getCustomer(id: string) {
  return db.user.findUnique({
    where: { id },
    include: {
      orders: { orderBy: { createdAt: "desc" }, take: 10 },
      addresses: true,
      reviews: true,
    },
  });
}

export default async function AdminCustomerDetail({
  params,
}: {
  params: { id: string };
}) {
  const customer = await getCustomer(params.id);

  if (!customer) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{customer.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <p className="mb-2">
              <span className="text-gray-600">Email: </span>
              {customer.email}
            </p>
            <p className="mb-2">
              <span className="text-gray-600">Phone: </span>
              {customer.phone || "Not provided"}
            </p>
            <p>
              <span className="text-gray-600">Country: </span>
              {customer.country}
            </p>
          </div>

          {/* Addresses */}
          {customer.addresses.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="text-xl font-bold mb-4">Saved Addresses</h2>
              <div className="space-y-4">
                {customer.addresses.map((addr: any) => (
                  <div key={addr.id} className="border rounded-lg p-4">
                    <p className="font-semibold mb-2">{addr.name}</p>
                    <p className="text-sm text-gray-600">{addr.street}</p>
                    <p className="text-sm text-gray-600">
                      {addr.postalCode} {addr.city}
                    </p>
                    <p className="text-sm text-gray-600">{addr.country}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Orders */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
            {customer.orders.length === 0 ? (
              <p className="text-gray-600">No orders</p>
            ) : (
              <div className="space-y-4">
                {customer.orders.map((order: any) => (
                  <div key={order.id} className="border-b pb-4">
                    <div className="flex justify-between mb-2">
                      <p className="font-semibold">{order.orderNumber}</p>
                      <p className="font-semibold">{order.total} DKK</p>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold mb-4">Customer Stats</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Orders</p>
                <p className="text-3xl font-bold">{customer.orders.length}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Reviews</p>
                <p className="text-3xl font-bold">{customer.reviews.length}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Member Since</p>
                <p className="font-semibold">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
