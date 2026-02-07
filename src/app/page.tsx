import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MentorCard from "@/components/mentor-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Book, Briefcase, CalendarCheck, FileText, Landmark, Search, Star, Goal, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import React from "react";

// Mock data
const mentors = [
  { id: 1, name: "Dr. Evelyn Reed", expertise: ["AI/ML", "Data Science", "Python"], rating: 4.9, reviews: 120, price: 75, image: PlaceHolderImages.find(p => p.id === 'mentor1') },
  { id: 2, name: "Johnathan Smith", expertise: ["React", "Node.js", "Full Stack"], rating: 4.8, reviews: 98, price: 60, image: PlaceHolderImages.find(p => p.id === 'mentor2') },
  { id: 3, name: "Maria Garcia", expertise: ["UI/UX", "Frontend", "Figma"], rating: 4.9, reviews: 150, price: 65, image: PlaceHolderImages.find(p => p.id === 'mentor3') },
  { id: 4, name: "Chen Wei", expertise: ["Constitutional Law", "CLAT", "Judiciary prep"], rating: 4.7, reviews: 85, price: 80, image: PlaceHolderImages.find(p => p.id === 'mentor4') },
];

const categories = [
  { name: "School", description: "Grades 1-12, board prep, and Olympiads.", icon: <GraduationCap /> },
  { name: "Intermediate", description: "Competitive exams like JEE, NEET, and EAMCET.", icon: <FileText /> },
  { name: "B.Tech/College", description: "Coding, development, and career skills.", icon: <Briefcase /> },
  { name: "Law", description: "CLAT, judiciary coaching, and law subjects.", icon: <Landmark /> },
  { name: "Govt. Exams", description: "UPSC, SSC, Banking, and other state exams.", icon: <Goal /> },
];

const howItWorksSteps = [
    { title: "Find your Mentor", description: "Search and filter from thousands of mentors for any subject.", icon: <Search /> },
    { title: "Book a Session", description: "Select a time that works for you and book your session in seconds.", icon: <CalendarCheck /> },
    { title: "Start Learning", description: "Connect with your mentor and start your personalized learning journey.", icon: <Book /> },
];

const testimonials = [
  { name: "Alex Johnson", role: "JEE Aspirant", text: "Orin helped me connect with a fantastic physics mentor who clarified all my doubts. My scores have improved dramatically!" },
  { name: "Sarah Lee", role: "B.Tech Student", text: "I was struggling with my final year project. My mentor on Orin provided invaluable guidance and helped me build a great project." }
]

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-card py-20 md:py-32">
          <div className="container relative z-10">
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
                Unlock Your Potential. <br/>Find Your Perfect Mentor.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Connect with experienced mentors across various fields to achieve your academic and career goals.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                 <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search for subjects, exams, or mentors..." className="pl-10 h-12" />
                 </div>
                <Button size="lg" className="h-12 w-full sm:w-auto">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          {heroImage && <Image src={heroImage.imageUrl} alt={heroImage.description} data-ai-hint={heroImage.imageHint} fill className="object-cover opacity-10" />}
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24 bg-background">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">How It Works</h2>
                    <p className="mt-4 text-muted-foreground">Get started in just three simple steps.</p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {howItWorksSteps.map(step => (
                        <Card key={step.title} className="text-center">
                            <CardContent className="p-8">
                                <div className="mx-auto bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center">
                                    {React.cloneElement(step.icon, { className: 'w-8 h-8' })}
                                </div>
                                <h3 className="mt-6 text-xl font-semibold font-headline">{step.title}</h3>
                                <p className="mt-2 text-muted-foreground">{step.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Explore by Category</h2>
              <p className="mt-4 text-muted-foreground">Find mentors in a wide range of subjects and exam preparations.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {categories.map((category) => (
                <Link href="#" key={category.name}>
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

        {/* Featured Mentors Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Featured Mentors</h2>
              <p className="mt-4 text-muted-foreground">Meet some of our top-rated mentors ready to guide you.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mentors.map((mentor) => (
                mentor.image && <MentorCard
                  key={mentor.id}
                  name={mentor.name}
                  imageUrl={mentor.image.imageUrl}
                  imageHint={mentor.image.imageHint}
                  expertise={mentor.expertise}
                  rating={mentor.rating}
                  reviews={mentor.reviews}
                  price={mentor.price}
                />
              ))}
            </div>
             <div className="text-center mt-12">
                <Button size="lg" variant="outline">
                    View All Mentors <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-card">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">What Our Students Say</h2>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map(testimonial => (
                        <Card key={testimonial.name}>
                           <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center font-bold text-lg">
                                    {testimonial.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-semibold font-headline">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                  </div>
                                </div>
                                <p className="mt-4 text-muted-foreground italic">"{testimonial.text}"</p>
                           </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>


        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary/10">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Start Your Journey?</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Join thousands of students and mentors on Orin. Whether you're looking to learn or share your expertise, your journey starts here.</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg">Find a Mentor</Button>
              <Button size="lg" variant="outline" className="bg-background">Become a Mentor</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
