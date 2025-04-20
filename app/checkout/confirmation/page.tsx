"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package } from "lucide-react"
import Header from "@/components/header"
import Link from "next/link"

interface Order {
  id: number
  items: any[]
  total: number
  date: string
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  status: string
}

export default function ConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("currentUser")
    if (!user) {
      router.push("/")
      return
    }

    // Get order from localStorage
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      const foundOrder = orders.find((o: Order) => o.id.toString() === orderId)

      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        router.push("/products")
      }
    } else {
      router.push("/products")
    }
  }, [orderId, router])

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          <div className="bg-gray-50 rounded p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Order Number:</span>
              <span>#{order.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Date:</span>
              <span>{new Date(order.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
            <Package className="h-4 w-4" />
            <span>A confirmation email has been sent to your email address.</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/profile">View Order History</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
