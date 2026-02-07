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
import { useToast } from "@/hooks/use-toast";
import { useAuth, useFirestore, FirestorePermissionError, errorEmitter } from "@/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
} from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";

export default function SignUpPage() {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();

  const saveUserDocument = (user: FirebaseUser) => {
    if (!firestore) return;

    const userDocRef = doc(firestore, 'users', user.uid);
    const userData = {
      id: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      role: role,
    };

    setDoc(userDocRef, userData, { merge: true })
      .then(() => {
        // On success, navigate to the correct profile creation page.
        if (role === 'student') {
          router.push('/create-student-profile');
        } else {
          router.push('/create-mentor-profile');
        }
      })
      .catch((serverError) => {
        // Create the rich, contextual error.
        const permissionError = new FirestorePermissionError({
          path: userDocRef.path,
          operation: 'create',
          requestResourceData: userData,
        });

        // Emit the error globally. The FirebaseErrorListener will catch this
        // and throw it, triggering the Next.js error boundary.
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Step 1: Await authentication.
      const result = await signInWithPopup(auth, provider);
      // Step 2: Call the non-blocking save function.
      saveUserDocument(result.user);
    } catch (error: any) {
       // This will only catch auth errors (e.g., popup closed).
       // Firestore errors are handled by the event emitter.
       toast({
        title: "Sign up failed",
        description: "Could not sign up with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEmailSignUp = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    if (password.length < 6) {
        toast({
            title: "Password too short",
            description: "Password should be at least 6 characters.",
            variant: "destructive",
        });
        return;
    }

    try {
      // Step 1: Await authentication
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Step 2: Call the non-blocking save function
      saveUserDocument(result.user);
    } catch (error: any) {
        // This will only catch auth errors (e.g., email-already-in-use).
        // Firestore errors are handled by the event emitter.
        toast({
            title: "Sign up failed",
            description: error.message,
            variant: "destructive",
        });
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
                <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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
              
              <Button className="w-full h-12" onClick={handleEmailSignUp} suppressHydrationWarning={true}>Sign Up</Button>
              
               <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button variant="outline" className="w-full h-12" onClick={handleGoogleSignUp} suppressHydrationWarning={true}>
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
