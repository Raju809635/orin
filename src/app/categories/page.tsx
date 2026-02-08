import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { categoriesData } from "@/lib/categories-data"; 

export default function CategoriesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section
          className="relative py-20 md:py-24 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://picsum.photos/seed/cat-bg/1920/400')" }}
        >
          <div className="absolute inset-0 bg-background/80 dark:bg-background/60 backdrop-blur-sm"></div>
          <div className="container relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Explore Categories</h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Browse mentors across various academic and career categories to find the perfect fit for your learning needs.
            </p>
            <div className="mt-8 max-w-xl mx-auto flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search mentors and topics..." className="pl-12 h-14 text-base rounded-full" />
              </div>
              <Button size="lg" className="h-14 px-8 text-base rounded-full bg-green-600 hover:bg-green-700">Search</Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {categoriesData.map((category) => (
                <Card key={category.id} className={`overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 bg-card border-2 ${category.borderClass} flex flex-col`}>
                  <div className={`p-3 font-semibold text-center ${category.titleClass}`}>
                    {category.title} <span className="text-muted-foreground">{category.subtitle}</span>
                  </div>
                   <div className="p-4 flex justify-center">
                    <Image
                      src={category.imageUrl}
                      alt={category.title}
                      width={400}
                      height={260}
                      className="rounded-md object-cover aspect-[400/260]"
                      data-ai-hint={category.imageHint}
                    />
                  </div>
                  <CardContent className="p-4 pt-0 text-center flex flex-col flex-grow">
                    <h3 className="font-headline font-bold text-xl">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.subtitle}</p>
                    <p className="text-sm text-muted-foreground mt-4">{category.stats}</p>
                    <div className="flex-grow" />
                    <Button asChild className={`mt-6 w-full font-semibold ${category.buttonClass}`}>
                      <Link href={category.href}>
                        Browse Mentors
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
