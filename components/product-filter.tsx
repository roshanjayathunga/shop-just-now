"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface ProductFilterProps {
  onSort: (option: string) => void
  sortOption: string
}

export default function ProductFilter({ onSort, sortOption }: ProductFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-sm text-gray-500">Browse our collection of products</p>
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="sort-select" className="text-sm whitespace-nowrap">
          Sort by:
        </Label>
        <Select value={sortOption} onValueChange={onSort}>
          <SelectTrigger id="sort-select" className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            <SelectItem value="price-asc">Price (Low to High)</SelectItem>
            <SelectItem value="price-desc">Price (High to Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
