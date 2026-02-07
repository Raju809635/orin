import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-headline">Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <p>Last updated: July 23, 2024</p>
              
              <h2 className="font-semibold text-foreground text-xl pt-4">1. Acceptance of Terms</h2>
              <p>By accessing or using the Orin platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.</p>
              
              <h2 className="font-semibold text-foreground text-xl pt-4">2. Description of Service</h2>
              <p>Orin is an online marketplace that connects students seeking mentorship with mentors. We provide tools for booking, communication, and payment processing but are not directly involved in the mentorship sessions themselves.</p>

              <h2 className="font-semibold text-foreground text-xl pt-4">3. User Accounts</h2>
              <p>To use certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>

              <h2 className="font-semibold text-foreground text-xl pt-4">4. User Conduct</h2>
              <p>You are responsible for all your activity in connection with the Service. You shall not post or transmit any communication or solicitation designed or intended to obtain password, account, or private information from any Orin user.</p>
              
              <h2 className="font-semibold text-foreground text-xl pt-4">5. Payments and Fees</h2>
              <p>Mentors set their own prices. Orin charges a service fee (commission) on each transaction. All payments are processed through our third-party payment provider. You agree to abide by their terms and conditions.</p>

              <h2 className="font-semibold text-foreground text-xl pt-4">6. Termination</h2>
              <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
