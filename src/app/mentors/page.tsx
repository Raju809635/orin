import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MentorCard from "@/components/mentor-card";
import { mentors } from "@/lib/mentors-data";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function MentorsPage() {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <div className="flex flex-1">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h2 className="font-headline text-lg font-semibold">Filters</h2>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <Accordion type="multiple" defaultValue={["category", "price", "rating", "experience"]} className="w-full">
                  <AccordionItem value="category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="school" />
                        <Label htmlFor="school">School</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="intermediate" />
                        <Label htmlFor="intermediate">Intermediate</Label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="college" />
                        <Label htmlFor="college">B.Tech/College</Label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="law" />
                        <Label htmlFor="law">Law</Label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="govt" />
                        <Label htmlFor="govt">Govt. Exams</Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>$0</span>
                        <span>$500</span>
                      </div>
                      <Slider defaultValue={[150]} max={500} step={10} />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="rating">
                    <AccordionTrigger>Rating</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                       <div className="flex items-center space-x-2">
                        <Checkbox id="5-star" />
                        <Label htmlFor="5-star">5 Stars</Label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="4-star" />
                        <Label htmlFor="4-star">4 Stars & up</Label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="3-star" />
                        <Label htmlFor="3-star">3 Stars & up</Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="experience">
                    <AccordionTrigger>Experience</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                       <div className="flex items-center space-x-2">
                        <Checkbox id="beginner" />
                        <Label htmlFor="beginner">Beginner (1-2 years)</Label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="intermediate-exp" />
                        <Label htmlFor="intermediate-exp">Intermediate (3-5 years)</Label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="expert" />
                        <Label htmlFor="expert">Expert (5+ years)</Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <main className="flex-grow p-4 md:p-6 lg:p-8">
              <div className="container px-0">
                <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold font-headline mb-2">
                    Explore Mentors
                  </h1>
                  <p className="text-muted-foreground">
                    Find the perfect mentor to guide you on your journey.
                  </p>
                  <div className="mt-6 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search by name, subject, or exam..." className="pl-10 h-12" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {mentors.map((mentor) => (
                    <MentorCard
                      key={mentor.id}
                      name={mentor.name}
                      imageUrl={mentor.imageUrl}
                      imageHint={mentor.imageHint}
                      expertise={mentor.expertise}
                      rating={mentor.rating}
                      reviews={mentor.reviews}
                      price={mentor.price}
                    />
                  ))}
                </div>
              </div>
            </main>
            <Footer />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
