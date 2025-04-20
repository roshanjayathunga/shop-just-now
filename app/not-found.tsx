"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  // This helps with client-side routing on GitHub Pages
  useEffect(() => {
    // Get the current path
    const path = window.location.pathname;

    // If we're on GitHub Pages, the path will include the repo name
    // We need to handle this for client-side routing
    if (path.includes("/shop-just-now/")) {
      const relativePath = path.replace("/shop-just-now", "");
      if (relativePath !== "/404.html") {
        router.push(relativePath);
      }
    }
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
