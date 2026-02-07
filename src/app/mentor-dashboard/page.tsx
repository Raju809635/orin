import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import MySessions from "@/components/dashboard/my-sessions";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

const myStudents = [
    { id: 1, name: 'Alex', lastSession: 'July 28, 2024', upcomingSession: 'August 5, 2024' },
    { id: 2, name: 'Maria', lastSession: 'July 29, 2024', upcomingSession: 'August 6, 2024' }
]

export default function MentorDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="space-y-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">Mentor Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Welcome back, Sarah! Manage your students and sessions.</p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold font-headline mb-4">My Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myStudents.map(student => (
                    <Card key={student.id}>
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-lg">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">Upcoming: {student.upcomingSession}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>

          <Separator />
          <MySessions />
        </div>
      </main>
      <Footer />
    </div>
  );
}
