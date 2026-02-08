"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import MySessions from "@/components/dashboard/my-sessions";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import MyStudents from "@/components/dashboard/my-students";
import ManageAvailability from "@/components/dashboard/ManageAvailability";

export default function MentorDashboardPage() {
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
                <h1 className="text-3xl md:text-4xl font-bold font-headline">Mentor Dashboard</h1>
                <p className="mt-2 text-muted-foreground">Welcome back, {user?.displayName || 'Mentor'}! Manage your students and sessions.</p>
              </>
            )}
          </div>
          
          <ManageAvailability />
          <Separator />

          <MyStudents />
          <Separator />

          <MySessions role="mentor" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
