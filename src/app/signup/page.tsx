import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";
import Logo from "@/components/icons/Logo";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <Logo className="h-12 w-12 text-primary" />
          <h1 className="text-3xl font-headline font-bold tracking-tighter text-center">
            Create Your Account
          </h1>
          <p className="text-muted-foreground text-center">
            Join SAI Talent Scout and start your athletic journey.
          </p>
        </div>
        <SignupForm />
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/"
            className="font-medium text-primary hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
