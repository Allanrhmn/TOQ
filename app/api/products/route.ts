import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    {
      id: "1",
      title: "Premium Headphones",
      price: 499,
      category: "electronics",
      description: "High-quality wireless headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    },
    {
      id: "2",
      title: "Smart Watch",
      price: 299,
      category: "electronics",
      description: "Track your fitness and stay connected",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    },
    {
      id: "3",
      title: "Wireless Charger",
      price: 149,
      category: "electronics",
      description: "Fast wireless charging for your devices",
      image: "https://images.unsplash.com/photo-1591290619976-b3baf8d6a0c3?w=500&q=80",
    },
  ];

  return NextResponse.json({ success: true, data: { products } });
}
