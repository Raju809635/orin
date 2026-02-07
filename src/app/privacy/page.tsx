import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-headline">Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <p>Last updated: July 23, 2024</p>

              <p>Orin ("us", "we", or "our") operates the Orin website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
              
              <h2 className="font-semibold text-foreground text-xl pt-4">1. Information Collection and Use</h2>
              <p>We collect several different types of information for various purposes to provide and improve our Service to you. This includes personal data like your name, email address, and payment information, as well as usage data about how you interact with the Service.</p>
              
              <h2 className="font-semibold text-foreground text-xl pt-4">2. Use of Data</h2>
              <p>Orin uses the collected data for various purposes:
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>To provide and maintain our Service</li>
                    <li>To notify you about changes to our Service</li>
                    <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                    <li>To provide customer support</li>
                    <li>To gather analysis or valuable information so that we can improve our Service</li>
                </ul>
              </p>

              <h2 className="font-semibold text-foreground text-xl pt-4">3. Data Security</h2>
              <p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

              <h2 className="font-semibold text-foreground text-xl pt-4">4. Your Data Protection Rights</h2>
              <p>You have certain data protection rights. Orin aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data. Please contact us to make such a request.</p>

            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
