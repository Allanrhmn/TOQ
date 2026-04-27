'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      label: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      label: "Customers",
      href: "/admin/customers",
      icon: Users,
    },
    {
      label: "Discounts",
      href: "/admin/discounts",
      icon: Tag,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-black text-white transition-transform duration-300 lg:translate-x-0 lg:static`}
      >
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">CREAT Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mt-8">
          {navItems.map((item: any) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-6 py-3 transition ${
                  isActive ? "bg-gray-800 border-l-4 border-white" : "hover:bg-gray-900"
                }`}
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-3 mt-8 w-full hover:bg-gray-900 transition text-red-400"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-4"
          >
            <Menu size={24} />
          </button>
        </div>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
