import Link from "next/link";
import { db } from "@/lib/db";
import { Eye } from "lucide-react";
export const dynamic = "force-dynamic";

async function getCustomers() {
  return db.user.findMany({
    include: {
      _count: { select: { orders: true, reviews: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export default async function AdminCustomers() {
  const customers = await getCustomers();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Customers</h1>

      {customers.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-gray-500">No customers yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Reviews
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer: any) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{customer.name}</td>
                  <td className="px-6 py-4 text-sm">{customer.email}</td>
                  <td className="px-6 py-4">{customer._count.orders}</td>
                  <td className="px-6 py-4">{customer._count.reviews}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(customer.createdAt).toLocaleDateString("da-DK")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/customers/${customer.id}`}
                      className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 inline-block"
                    >
                      <Eye size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
