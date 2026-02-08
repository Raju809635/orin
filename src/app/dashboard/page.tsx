"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import MySessions from "@/components/dashboard/my-sessions";
import RecommendedMentors from "@/components/dashboard/recommended-mentors";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="space-y-12">
          <div>
            {isUserLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl font-bold font-headline">Your Dashboard</h1>
                <p className="mt-2 text-muted-foreground">Welcome back, {user?.displayName || 'User'}! Here's your personalized hub.</p>
              </>
            )}
          </div>
          <RecommendedMentors />
          <Separator />
          <MySessions role="student" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
