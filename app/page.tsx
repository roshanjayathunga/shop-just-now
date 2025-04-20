import LoginForm from "@/components/login-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">SwiftShop</h1>
          <p className="mt-2 text-sm text-gray-600">Your one-stop e-commerce solution</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
