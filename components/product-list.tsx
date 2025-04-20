"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart } from "lucide-react";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {products.length === 0 ? (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500">No products found.</p>
        </div>
      ) : (
        products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <Link href={`/products/${product.id}`}>
              <div className="aspect-square relative overflow-hidden bg-gray-100">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            </Link>
            <CardHeader className="p-4">
              <Link
                href={`/products/${product.id}`}
                className="font-medium hover:underline"
              >
                {product.name}
              </Link>
              <p className="text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                {product.inventory <= 5 && product.inventory > 0 && (
                  <span className="text-xs text-orange-500">
                    Only {product.inventory} left
                  </span>
                )}
                {product.inventory === 0 && (
                  <span className="text-xs text-red-500">Out of stock</span>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                onClick={() => addToCart(product)}
                className="w-full"
                disabled={product.inventory === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to cart
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
