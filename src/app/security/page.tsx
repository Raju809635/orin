import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
               <div className="mx-auto bg-primary/10 text-primary w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <ShieldCheck className="w-8 h-8" />
                </div>
              <CardTitle className="text-3xl md:text-4xl font-headline">Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <p>
                At Orin, we take the security of your data and personal information very seriously. Our platform is built with robust security measures to ensure a safe and trustworthy environment for both students and mentors.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground">Data Encryption</h3>
                  <p>All data transmitted between your browser and our servers is encrypted using industry-standard SSL/TLS protocols. Your sensitive information, such as passwords, is always stored in a hashed format.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Secure Payments</h3>
                  <p>We partner with leading payment processors to handle all transactions. Your payment details are never stored on our servers, ensuring your financial information is protected.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Account Protection</h3>
                  <p>We encourage all users to create strong, unique passwords. We also implement measures to protect against unauthorized account access.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Privacy</h3>
                  <p>We are committed to protecting your privacy. Please review our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> for detailed information on how we collect, use, and protect your data.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
