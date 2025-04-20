"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ProductList from "@/components/product-list"
import Header from "@/components/header"
import ProductFilter from "@/components/product-filter"
import type { Product } from "@/lib/types"
import { products } from "@/lib/data"

export default function ProductsPage() {
  const router = useRouter()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [sortOption, setSortOption] = useState("name-asc")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("currentUser")
    if (!user) {
      router.push("/")
    }
  }, [router])

  useEffect(() => {
    let result = [...products]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply sorting
    switch (sortOption) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
    }

    setFilteredProducts(result)
  }, [sortOption, searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSort = (option: string) => {
    setSortOption(option)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />
      <main className="container mx-auto px-4 py-8">
        <ProductFilter onSort={handleSort} sortOption={sortOption} />
        <ProductList products={filteredProducts} />
      </main>
    </div>
  )
}
