import Link from "next/link";
import { db } from "@/lib/db";
import { Trash2, Plus } from "lucide-react";
export const dynamic = "force-dynamic";

async function getDiscounts() {
  return db.discount.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminDiscounts() {
  const discounts = await getDiscounts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Discounts</h1>
        <Link
          href="/admin/discounts/new"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900"
        >
          <Plus size={20} />
          New Discount
        </Link>
      </div>

      {discounts.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">No discount codes yet</p>
          <Link
            href="/admin/discounts/new"
            className="text-blue-600 hover:underline"
          >
            Create your first discount
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount: any) => (
                <tr key={discount.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-lg">
                    {discount.code}
                  </td>
                  <td className="px-6 py-4 text-sm capitalize">
                    {discount.type}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {discount.type === "percentage"
                      ? `${discount.amount}%`
                      : `${discount.amount} DKK`}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {discount.usedCount}
                    {discount.maxUses && ` / ${discount.maxUses}`}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        discount.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {discount.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-red-100 rounded-lg text-red-600">
                      <Trash2 size={18} />
                    </button>
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
