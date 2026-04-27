'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewDiscountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage",
    amount: "",
    minPurchase: "",
    maxUses: "",
    expiresAt: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/discounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
          minPurchase: formData.minPurchase ? parseFloat(formData.minPurchase) : null,
          maxUses: formData.maxUses ? parseInt(formData.maxUses) : null,
          expiresAt: formData.expiresAt ? new Date(formData.expiresAt) : null,
        }),
      });

      if (!res.ok) {
        alert("Failed to create discount");
        return;
      }

      router.push("/admin/discounts");
    } catch (error) {
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link
        href="/admin/discounts"
        className="flex items-center gap-2 text-blue-600 hover:underline mb-8"
      >
        <ArrowLeft size={18} />
        Back to Discounts
      </Link>

      <h1 className="text-3xl font-bold mb-8">Create Discount Code</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg uppercase"
            placeholder="SUMMER20"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Amount {formData.type === "percentage" ? "(%)" : "(DKK)"}
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Min Purchase (DKK)</label>
            <input
              type="number"
              name="minPurchase"
              value={formData.minPurchase}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Max Uses</label>
            <input
              type="number"
              name="maxUses"
              value={formData.maxUses}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Unlimited"
              min="1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Expires At</label>
          <input
            type="datetime-local"
            name="expiresAt"
            value={formData.expiresAt}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-900 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Discount"}
          </button>
          <Link
            href="/admin/discounts"
            className="flex-1 border-2 border-gray-300 text-center py-3 rounded-lg font-bold hover:bg-gray-100"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
