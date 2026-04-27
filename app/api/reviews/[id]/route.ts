import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedCustomer } from "@/lib/customer-auth";

export const dynamic = "force-dynamic";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthenticatedCustomer(request);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const review = await db.review.findUnique({
      where: { id: params.id },
    });

    if (!review) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    if (review.userId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const productId = review.productId;

    await db.review.delete({
      where: { id: params.id },
    });

    const remainingReviews = await db.review.findMany({
      where: { productId },
    });

    if (remainingReviews.length > 0) {
      const averageRating =
        remainingReviews.reduce((sum, r) => sum + r.rating, 0) /
        remainingReviews.length;

      await db.product.update({
        where: { id: productId },
        data: { rating: averageRating },
      });
    } else {
      await db.product.update({
        where: { id: productId },
        data: { rating: null },
      });
    }

    return NextResponse.json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Delete review error:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
