"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  price: number;
  description?: string;
  countInStock?: number;
};

export default function ProductDetails() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/${id}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-4">Loading product...</p>;
  if (!product) return <p className="p-4">Product not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600 mt-2">€{product.price}</p>
      <p className="mt-4">{product.description}</p>
      <p className="mt-2 text-sm">Stock: {product.countInStock}</p>
    </div>
  );
}