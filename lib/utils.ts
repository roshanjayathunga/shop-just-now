import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to get the correct path for GitHub Pages
export function getBasePath(path: string): string {
  // In development, use the path as is
  if (process.env.NODE_ENV !== "production") {
    return path;
  }

  // In production (GitHub Pages), prepend the repo name
  return `/shop-just-now${path}`;
}
