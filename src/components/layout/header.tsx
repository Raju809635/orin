"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, GraduationCap, LayoutDashboard, User as UserIcon, LogOut, Settings, Moon, Sun, Briefcase } from "lucide-react";
import { useAuth, useUser } from "@/firebase";
import { signOut as firebaseSignOut } from "firebase/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleSignOut = async () => {
    if (!auth) return;
    await firebaseSignOut(auth);
    router.push('/');
  };

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/categories", label: "Categories" },
    { href: "/mentors", label: "Browse Mentors" },
    { href: "/become-a-mentor", label: "Become a Mentor" },
  ];
  
  const getDashboardHref = () => {
      // All users are directed to the student dashboard from the header.
      // Mentors can access their dashboard from the sign-in page.
      return '/dashboard';
  }

  const getProfileHref = () => {
    return '/profile';
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-6 flex items-center">
          <Link href="/home" className="flex items-center space-x-2">
            <div className="bg-primary rounded-md p-1.5 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold font-headline text-2xl tracking-tighter">Orin</span>
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
        <div className="flex flex-1 items-center justify-end space-x-4">
           {isUserLoading ? (
             <Skeleton className="h-8 w-8 rounded-full" />
           ) : user ? (
            <div className="flex items-center space-x-2">
                <Link href={getDashboardHref()} className="hidden md:inline-flex">
                    <Button>Dashboard</Button>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Settings className="h-5 w-5" />
                            <span className="sr-only">Settings</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.displayName || 'User'}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                            </p>
                        </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {user.role === 'mentor' && (
                            <>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard">
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        <span>Your Dashboard</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/mentor-dashboard">
                                        <Briefcase className="mr-2 h-4 w-4" />
                                        <span>Mentor Dashboard</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </>
                        )}
                        <DropdownMenuItem asChild>
                           <Link href={getProfileHref()}>
                            <UserIcon className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <div className="flex items-center justify-between w-full">
                                <Label htmlFor="dark-mode-dropdown" className="flex items-center gap-2 cursor-pointer text-sm font-normal">
                                    {theme === 'dark' ? <Moon className="h-4 w-4"/> : <Sun className="h-4 w-4"/>}
                                    <span>Dark Mode</span>
                                </Label>
                                <Switch
                                    id="dark-mode-dropdown"
                                    checked={theme === "dark"}
                                    onCheckedChange={(checked) => {
                                        setTheme(checked ? "dark" : "light")
                                    }}
                                />
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
          ) : (
            <div className="hidden items-center space-x-2 md:flex">
              <Link href="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
           <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
               <SheetHeader>
                 <SheetTitle>
                    <Link href="/home" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                        <div className="bg-primary rounded-md p-1.5 flex items-center justify-center">
                            <GraduationCap className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="font-bold font-headline text-2xl tracking-tighter">Orin</span>
                    </Link>
                  </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-6">
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
                <Separator className="my-2"/>
                 {user ? (
                   <div className="flex flex-col space-y-4">
                      {user.role === 'mentor' ? (
                        <>
                          <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-base font-medium transition-colors hover:text-primary text-foreground/80">Your Dashboard</Link>
                          <Link href="/mentor-dashboard" onClick={() => setIsOpen(false)} className="text-base font-medium transition-colors hover:text-primary text-foreground/80">Mentor Dashboard</Link>
                        </>
                      ) : (
                        <Link href={getDashboardHref()} onClick={() => setIsOpen(false)} className="text-base font-medium transition-colors hover:text-primary text-foreground/80">Dashboard</Link>
                      )}
                      <Link href={getProfileHref()} onClick={() => setIsOpen(false)} className="text-base font-medium transition-colors hover:text-primary text-foreground/80">Profile</Link>
                      <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="text-left text-base font-medium transition-colors hover:text-primary text-foreground/80">Sign Out</button>
                   </div>
                 ) : (
                   <div className="flex flex-col space-y-4">
                     <Link href="/signin" onClick={() => setIsOpen(false)} className="text-base font-medium transition-colors hover:text-primary text-foreground/80">Sign In</Link>
                     <Link href="/" onClick={() => setIsOpen(false)} className="text-base font-medium transition-colors hover:text-primary text-foreground/80">Sign Up</Link>
                   </div>
                 )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
