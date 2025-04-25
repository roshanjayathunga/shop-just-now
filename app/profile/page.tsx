"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";
import { Package, User } from "lucide-react";
import Link from "next/link";

interface Order {
  id: number;
  items: any[];
  total: number;
  date: string;
  status: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("currentUser");
    if (!user) {
      router.push("/");
      return;
    }

    const userData = JSON.parse(user);
    setUsername(userData.username);

    // Get orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Account</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle id="profile-title">Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium" id="username">
                      {username}
                    </h3>
                    <p className="text-sm text-gray-500">Standard User</p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-2">
                  <h3 className="font-medium">Account Settings</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-500" id="email">
                        user@example.com
                      </p>
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Password</p>
                      <p className="text-sm text-gray-500">••••••••</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle id="order-history-title">Order History</CardTitle>
                <CardDescription>View your past orders</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-6">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="font-medium mb-2">No orders yet</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      You haven't placed any orders yet.
                    </p>
                    <Button asChild>
                      <Link href="/products">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                          <div>
                            <h3 className="font-medium">Order #{order.id}</h3>
                            <p className="text-sm text-gray-500">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-medium">
                              ${order.total.toFixed(2)}
                            </span>
                            <span className="text-sm px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items.length}{" "}
                          {order.items.length === 1 ? "item" : "items"}
                        </div>
                        <div className="mt-2 flex justify-end">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
