import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import MySessions from "@/components/dashboard/my-sessions";
import RecommendedMentors from "@/components/dashboard/recommended-mentors";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="space-y-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">Student Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Welcome back, Alex! Here's your personalized learning hub.</p>
          </div>
          <RecommendedMentors />
          <Separator />
          <MySessions />
        </div>
      </main>
      <Footer />
    </div>
  );
}
