import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [totalOrders, totalRevenue, totalProducts, totalCustomers] =
      await Promise.all([
        db.order.count(),
        db.order.aggregate({
          _sum: { total: true },
        }),
        db.product.count(),
        db.user.count(),
      ]);

    const recentOrders = await db.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });

    return NextResponse.json({
      totalOrders,
      totalRevenue: totalRevenue._sum?.total || 0,
      totalProducts,
      totalCustomers,
      recentOrders,
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
