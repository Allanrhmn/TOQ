import { db } from "@/lib/db";
import { DollarSign, ShoppingCart, Package, Users } from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats() {
  const [totalOrders, totalRevenue, totalProducts, totalCustomers] =
    await Promise.all([
      db.order.count(),
      db.order.aggregate({
        _sum: { total: true },
      }),
      db.product.count(),
      db.user.count(),
    ]);

  return {
    totalOrders,
    totalRevenue: totalRevenue._sum?.total || 0,
    totalProducts,
    totalCustomers,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    {
      label: "Total Revenue",
      value: `${stats.totalRevenue.toFixed(2)} DKK`,
      icon: DollarSign,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      label: "Total Customers",
      value: stats.totalCustomers,
      icon: Users,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card: any) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-2">{card.label}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <Icon className={`${card.iconColor}`} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
