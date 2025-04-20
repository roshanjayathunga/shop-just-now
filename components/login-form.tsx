"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LockOpenIcon as LockClosedIcon } from "lucide-react"

export default function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check credentials against predefined users
    const users = [
      { username: "standard_user", password: "secret_sauce" },
      { username: "locked_out_user", password: "secret_sauce" },
      { username: "problem_user", password: "secret_sauce" },
      { username: "performance_glitch_user", password: "secret_sauce" },
    ]

    const user = users.find((u) => u.username === username && u.password === password)

    if (user) {
      // Store user in localStorage
      localStorage.setItem("currentUser", JSON.stringify({ username: user.username }))
      router.push("/products")
    } else if (username === "locked_out_user" && password === "secret_sauce") {
      setError("This user has been locked out.")
    } else {
      setError("Username and password do not match any user in this service")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4 rounded-md shadow-sm">
        <div>
          <Label htmlFor="username" className="sr-only">
            Username
          </Label>
          <Input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        <div>
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
          </span>
          Sign in
        </Button>
      </div>
    </form>
  )
}
