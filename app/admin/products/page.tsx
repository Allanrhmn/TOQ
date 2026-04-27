import Link from "next/link";
import { db } from "@/lib/db";
import { Pencil, Trash2, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

async function getProducts() {
  return db.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminProducts() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900"
        >
          <Plus size={20} />
          New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">No products yet</p>
          <Link
            href="/admin/products/new"
            className="text-blue-600 hover:underline"
          >
            Create your first product
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Stock
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
              {products.map((product: any) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{product.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {product.price} DKK
                  </td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 flex justify-end">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="p-2 hover:bg-blue-100 rounded-lg text-blue-600"
                    >
                      <Pencil size={18} />
                    </Link>
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
