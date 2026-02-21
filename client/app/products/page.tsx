"use client";

import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  countInStock?: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="p-4">Loading products...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">€{product.price}</p>
            <p className="text-sm mt-2">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}