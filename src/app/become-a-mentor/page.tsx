"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import React from "react";

export default function BecomeAMentorPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted",
      description: "Thank you! We will review your application and get back to you soon.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-headline">Become a Mentor</CardTitle>
              <CardDescription>Join our community and start sharing your expertise with students.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="Enter your full name" required/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required/>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subjects">Subjects You Can Teach</Label>
                  <Input id="subjects" placeholder="e.g., Physics, React, Constitutional Law" required/>
                  <p className="text-xs text-muted-foreground">Separate subjects with commas.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Your Experience</Label>
                  <Textarea id="experience" placeholder="Tell us about your teaching or industry experience..." required/>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
                  <Input id="linkedin" placeholder="https://linkedin.com/in/yourprofile" />
                </div>
                <Button type="submit" className="w-full h-12">Submit Application</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
