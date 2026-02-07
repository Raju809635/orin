"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, GraduationCap } from "lucide-react";
import { useAuth, useUser } from "@/firebase";
import { signOut as firebaseSignOut } from "firebase/auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await firebaseSignOut(auth);
    router.push('/');
  };

  const navLinks = [
    { href: "/mentors", label: "Browse Mentors" },
    { href: "/become-a-mentor", label: "Become a Mentor" },
  ];
  
  const getDashboardHref = () => {
      if (!user) return "/";
      return user.role === 'mentor' ? '/mentor-dashboard' : '/dashboard';
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-6 flex items-center">
          <Link href="/home" className="flex items-center space-x-2">
            <div className="bg-primary rounded-md p-1.5 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold font-headline text-2xl tracking-tighter">ORIN</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-primary text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
           {!isUserLoading && user ? (
            <>
              <Link href={getDashboardHref()}>
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Button onClick={handleSignOut}>Sign Out</Button>
            </>
          ) : !isUserLoading ? (
            <>
              <Link href="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/">
                <Button>Sign Up</Button>
              </Link>
            </>
          ) : null}
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden ml-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/home" className="flex items-center space-x-2 mb-6" onClick={() => setIsOpen(false)}>
                <div className="bg-primary rounded-md p-1.5 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold font-headline text-2xl tracking-tighter">ORIN</span>
            </Link>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium transition-colors hover:text-primary text-foreground/80"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
