import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Right Mentor for Your Goals",
    date: "July 22, 2024",
    excerpt: "Finding the right mentor can be a game-changer for your academic and career journey. This guide will walk you through the key factors to consider when making your choice.",
    imageUrl: "https://picsum.photos/seed/b1/600/400",
    imageHint: "choosing mentor",
  },
  {
    id: 2,
    title: "Mastering Competitive Exams: Tips from Top Mentors",
    date: "July 15, 2024",
    excerpt: "We've gathered insights from our most experienced mentors to bring you proven strategies for acing competitive exams like JEE, NEET, and UPSC.",
    imageUrl: "https://picsum.photos/seed/b2/600/400",
    imageHint: "exam preparation",
  },
  {
    id: 3,
    title: "The Power of Personalized Learning in the Digital Age",
    date: "July 8, 2024",
    excerpt: "Discover how one-on-one mentorship provides a learning experience that standardized methods can't match, and why it's more important than ever.",
    imageUrl: "https://picsum.photos/seed/b3/600/400",
    imageHint: "personalized learning",
  },
];


export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Orin Blog</h1>
          <p className="mt-4 text-muted-foreground">Insights, tips, and stories on learning and mentorship.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
             <Card key={post.id} className="flex flex-col">
              <CardHeader className="p-0">
                 <Image src={post.imageUrl} alt={post.title} width={600} height={400} className="rounded-t-lg object-cover h-60 w-full" data-ai-hint={post.imageHint} />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                <CardTitle className="text-xl font-headline leading-snug">{post.title}</CardTitle>
                <CardDescription className="mt-2">{post.excerpt}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="link" className="p-0 h-auto">
                  <Link href="#">
                    Read More <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
