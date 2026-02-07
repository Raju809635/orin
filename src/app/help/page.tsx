import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    question: "How do I book a mentor?",
    answer: "You can browse mentors by category or use the search bar. Once you find a mentor you like, click 'View Profile' to see their availability and book a session directly from their profile page."
  },
  {
    question: "What is the platform's commission fee?",
    answer: "Orin charges a 20% commission on all completed sessions. This fee helps us maintain the platform, process payments securely, and provide support."
  },
  {
    question: "How do I become a mentor?",
    answer: "We're thrilled you're interested! Click on the 'Become a Mentor' link in the header or footer, fill out the application form with your details and expertise, and our team will review it."
  },
  {
    question: "Can I cancel a booked session?",
    answer: "Yes, you can cancel a session. Please refer to our cancellation policy, which can be found in the Terms of Service, for details on deadlines and potential refunds."
  },
  {
    question: "How do I communicate with my mentor?",
    answer: "Once a session is booked, you can communicate with your mentor through our secure, real-time chat feature available in your user dashboard."
  }
];

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
           <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Help Center</h1>
            <p className="mt-4 text-muted-foreground">Find answers to frequently asked questions.</p>
          </div>
          <Card>
            <CardContent className="p-6">
               <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
