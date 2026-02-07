"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import GoogleIcon from "@/components/icons/google-icon";
import { signInWithGoogle } from "@/lib/firebase/auth";

export default function SignInPage() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      // For now, default redirect to student dashboard.
      // A more robust solution would check user role from a database.
      router.push('/dashboard');
    }
  };

  return (
     <div className="flex flex-col min-h-screen bg-background items-center justify-center p-4">
        <div className="absolute top-8 left-8 flex items-center space-x-2">
           <Link href="/home" className="flex items-center space-x-2">
              <div className="bg-primary rounded-md p-1.5 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold font-headline text-2xl tracking-tighter">ORIN</span>
            </Link>
       </div>
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-headline">Sign In</CardTitle>
              <CardDescription>Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between items-baseline">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
                  </div>
                  <Input id="password" type="password" placeholder="Enter your password" />
                </div>

                <div className="space-y-2">
                  <Link href="/dashboard" className="block w-full">
                      <Button className="w-full h-12">Sign In as Student</Button>
                  </Link>
                  <Link href="/mentor-dashboard" className="block w-full">
                      <Button className="w-full h-12" variant="secondary">Sign In as Mentor</Button>
                  </Link>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>

                <Button variant="outline" className="w-full h-12" onClick={handleGoogleSignIn}>
                    <GoogleIcon className="mr-2 h-5 w-5" />
                    Sign In with Google
                </Button>

                 <div className="mt-6 text-center text-sm text-muted-foreground">
                  Don't have an account? <Link href="/" className="text-primary hover:underline">Sign Up</Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}
