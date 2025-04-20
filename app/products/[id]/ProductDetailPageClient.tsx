"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import type { Product } from "@/lib/types";
import Header from "@/components/header";
import { useCart } from "@/lib/cart-context";

export default function ProductDetailPageClient({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("currentUser");
    if (!user) {
      router.push("/");
      return;
    }

    // Find product by ID
    const foundProduct = products.find(
      (p) => p.id === Number.parseInt(params.id)
    );
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      router.push("/products");
    }
    setIsLoading(false);
  }, [params.id, router]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      router.push("/cart");
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (product && quantity < product.inventory) {
      setQuantity(quantity + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <p>Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to products
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square relative overflow-hidden bg-gray-100 rounded-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-4">
              <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
              {product.inventory <= 5 && product.inventory > 0 && (
                <p className="text-sm text-orange-500 mt-1">
                  Only {product.inventory} left in stock
                </p>
              )}
              {product.inventory === 0 && (
                <p className="text-sm text-red-500 mt-1">Out of stock</p>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {product.inventory > 0 && (
              <div className="mt-8">
                <div className="flex items-center mb-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-4 text-lg font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.inventory}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button onClick={handleAddToCart} className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to cart
                </Button>
              </div>
            )}

            {product.inventory === 0 && (
              <Button disabled className="mt-8 w-full">
                Out of stock
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
