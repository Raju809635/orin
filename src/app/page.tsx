"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import GoogleIcon from "@/components/icons/google-icon";
import { signInWithGoogle } from "@/lib/firebase/auth";

export default function SignUpPage() {
  const [role, setRole] = useState('student');
  const router = useRouter();

  const handleGoogleSignUp = async () => {
    const user = await signInWithGoogle();
    if (user) {
      if (role === 'student') {
        router.push('/create-student-profile');
      } else {
        router.push('/create-mentor-profile');
      }
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
            <CardTitle className="text-3xl font-headline">Create an Account</CardTitle>
            <CardDescription>Join Orin to find mentors or share your knowledge.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a password" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm your password" />
              </div>
              <div className="space-y-2">
                 <Label>I am a</Label>
                 <RadioGroup defaultValue="student" className="flex space-x-4" onValueChange={setRole}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="role-student" />
                      <Label htmlFor="role-student">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mentor" id="role-mentor" />
                      <Label htmlFor="role-mentor">Mentor</Label>
                    </div>
                  </RadioGroup>
              </div>
              
              <Link href={role === 'student' ? '/create-student-profile' : '/create-mentor-profile'} className="block w-full">
                <Button className="w-full h-12">Sign Up</Button>
              </Link>
              
               <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button variant="outline" className="w-full h-12" onClick={handleGoogleSignUp}>
                <GoogleIcon className="mr-2 h-5 w-5" />
                Sign Up with Google
              </Button>

               <div className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account? <Link href="/signin" className="text-primary hover:underline">Sign In</Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
