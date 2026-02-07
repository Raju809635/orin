import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-headline">About Orin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <p>
                Welcome to Orin, your premier destination for connecting with expert mentors across a vast spectrum of academic and professional fields. Our mission is to empower learners of all ages to achieve their full potential by providing personalized, one-on-one guidance from seasoned experts.
              </p>
              <p>
                At Orin, we believe that the right mentor can be a transformative force in a student's journey. Whether you're preparing for critical exams like JEE, NEET, and CLAT, navigating the challenges of college-level coursework, or seeking to acquire new career skills, our platform is designed to connect you with the perfect guide.
              </p>
              <p>
                We are a passionate team of educators, technologists, and innovators dedicated to making quality mentorship accessible to everyone. We are committed to building a vibrant community where knowledge is shared, skills are honed, and futures are built.
              </p>
              <p>
                Join us today and take the next step in your learning journey.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
