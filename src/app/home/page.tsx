import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import React from "react";


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary py-20 md:py-32">
          <div className="container">
            <div className="max-w-4xl text-center mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight">
                Find Your <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">Perfect Mentor</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                Connect with expert mentors for academic success and career growth. Personalized guidance across all subjects and competitive exams.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/mentors">
                  <Button size="lg" className="h-12 px-8">
                      Explore Mentors
                  </Button>
                </Link>
                <Link href="/become-a-mentor">
                  <Button size="lg" variant="outline" className="h-12 px-8 bg-background/30 border-primary/20 hover:bg-background/80">
                      Become a Mentor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-primary-foreground">
          <div className="container py-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-headline">Ready to Start Your Learning Journey?</h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto opacity-90">Join thousands of students finding success with expert mentors</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
