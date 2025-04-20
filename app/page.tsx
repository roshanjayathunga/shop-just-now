import LoginForm from "@/components/login-form";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Shop Just Now
          </h1>
          <p className="mt-2 text-sm text-foreground">
            Your one-stop e-commerce solution
          </p>
        </div>
        <LoginForm />
      </div>
      <footer className="absolute bottom-0 w-full p-4 text-center text-gray-500">
        <p className="text-sm">This is a demo project for software testing</p>
        <p className="text-xs text-gray-400">
          Developed with ❤️ by Roshan Jayathunga
        </p>
      </footer>
    </div>
  );
}
