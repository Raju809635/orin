import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Briefcase, FileText, Landmark, Goal, GraduationCap } from "lucide-react";
import Link from 'next/link';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import React from "react";

// Mock data
const categories = [
  { name: "School", description: "Grades 1-12, board prep, and Olympiads.", icon: <GraduationCap /> },
  { name: "Intermediate", description: "Competitive exams like JEE, NEET, and EAMCET.", icon: <FileText /> },
  { name: "B.Tech/College", description: "Coding, development, and career skills.", icon: <Briefcase /> },
  { name: "Law", description: "CLAT, judiciary coaching, and law subjects.", icon: <Landmark /> },
  { name: "Govt. Exams", description: "UPSC, SSC, Banking, and other state exams.", icon: <Goal /> },
];


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

        {/* Categories Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Choose Your Category</h2>
              <p className="mt-4 text-muted-foreground">Find mentors in a wide range of subjects and exam preparations.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {categories.map((category) => (
                <Link href={`/mentors?category=${category.name.toLowerCase()}`} key={category.name}>
                  <Card className="group text-center hover:bg-primary/5 hover:border-primary/20 transition-all">
                    <CardContent className="p-6">
                      <div className="mx-auto text-primary w-12 h-12 flex items-center justify-center">
                        {React.cloneElement(category.icon, { className: 'w-8 h-8' })}
                      </div>
                      <h3 className="mt-4 font-semibold font-headline">{category.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
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
