import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import Logo from "@/components/icons/Logo";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <Logo className="h-12 w-12 text-primary" />
          <h1 className="text-3xl font-headline font-bold tracking-tighter text-center">
            Welcome to SAI Talent Scout
          </h1>
          <p className="text-muted-foreground text-center">
            Sign in to assess and discover athletic potential.
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary hover:underline underline-offset-4"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
