"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, FirestorePermissionError, errorEmitter } from "@/firebase";
import { doc, setDoc } from 'firebase/firestore';

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/signin');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  if (isUserLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container py-12 md:py-20">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64 mt-2" />
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <div className="space-y-2">
                     <Skeleton className="h-6 w-32" />
                     <Skeleton className="h-4 w-48" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                 <Skeleton className="h-12 w-full" />
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`;
    }
    return name.slice(0, 2);
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!firestore) return;
      setIsSaving(true);
      
      const userDocRef = doc(firestore, 'users', user.id);
      const updatedData = {
          displayName,
          photoURL,
      };

      setDoc(userDocRef, updatedData, { merge: true })
        .then(() => {
            toast({
                title: "Profile Updated",
                description: "Your profile information has been successfully updated.",
            });
            // The useUser hook will automatically reflect the changes.
        })
        .catch((serverError) => {
            const permissionError = new FirestorePermissionError({
                path: userDocRef.path,
                operation: 'update',
                requestResourceData: updatedData,
            });
            errorEmitter.emit('permission-error', permissionError);
            toast({
                title: "Update Failed",
                description: "Could not update your profile. Please try again.",
                variant: "destructive"
            });
        })
        .finally(() => {
            setIsSaving(false);
        });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-headline">Your Profile</CardTitle>
              <CardDescription>View and edit your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-8">
                 <Avatar className="h-24 w-24">
                    <AvatarImage src={photoURL || user.photoURL || undefined} alt={displayName || 'User'} />
                    <AvatarFallback className="text-3xl">{getInitials(displayName)}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-2xl font-semibold">{displayName || user.displayName}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input 
                    id="displayName" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                    placeholder="Your name"
                  />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="photoURL">Photo URL</Label>
                  <Input 
                    id="photoURL" 
                    value={photoURL} 
                    onChange={(e) => setPhotoURL(e.target.value)}
                    placeholder="https://example.com/your-image.png"
                  />
                </div>
                <Button type="submit" className="w-full h-12" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
