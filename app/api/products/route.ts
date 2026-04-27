import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    {
      id: "1",
      title: "B-All-in Tee",
      price: 200,
      category: "tees",
      description: "Classic B-All-in Tee",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
      stock: 5,
      status: "In stock",
    },
    {
      id: "2",
      title: "Baby escape Tee",
      price: 249,
      category: "tees",
      description: "Baby escape Tee",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
      stock: 0,
      status: "Sold Out",
    },
    {
      id: "3",
      title: "Creat brownie overshirt",
      price: 799,
      category: "outerwear",
      description: "Premium brownie overshirt",
      image: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&q=80",
      stock: 0,
      status: "Sold Out",
    },
    {
      id: "4",
      title: "CREAT Card holder",
      price: 200,
      category: "accessories",
      description: "Compact card holder",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
      stock: 10,
      status: "In stock",
    },
    {
      id: "5",
      title: "CREAT GORE-TEX TRACKSUIT",
      price: 1000,
      originalPrice: 2500,
      category: "outerwear",
      description: "Premium GORE-TEX tracksuit on sale",
      image: "https://images.unsplash.com/photo-1552062407-291826ab63fd?w=500&q=80",
      stock: 8,
      status: "On Sale",
    },
    {
      id: "6",
      title: "CREAT SKULL TECH BEANIE - BLACK",
      price: 100,
      category: "accessories",
      description: "Black skull tech beanie",
      image: "https://images.unsplash.com/photo-1529090786122-2b5b6a6f7e5f?w=500&q=80",
      stock: 15,
      status: "In stock",
    },
  ];

  return NextResponse.json({ success: true, data: { products } });
}
