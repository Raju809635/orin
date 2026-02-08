import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function CreateProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-headline">Create Your Profile</CardTitle>
              <CardDescription>Tell us a bit about yourself to get started.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="classLevel">Current Class/Grade</Label>
                  <Input id="classLevel" placeholder="e.g., 12th Grade, B.Tech 2nd Year" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academicGoals">Your Goals</Label>
                  <Textarea id="academicGoals" placeholder="What are you hoping to achieve? e.g., Prepare for an exam, learn a new skill..." />
                </div>
                <Link href="/dashboard" className="block">
                    <Button className="w-full h-12">Complete Profile & Go to Dashboard</Button>
                </Link>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
