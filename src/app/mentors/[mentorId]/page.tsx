
"use client";

import React from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Calendar as CalendarIcon, AlertCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useDoc, useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { doc, addDoc, collection } from "firebase/firestore";
import type { User } from "@/models/user";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MentorProfilePage() {
  const params = useParams<{ mentorId: string }>();
  const firestore = useFirestore();
  const router = useRouter();
  const { user: currentUser } = useUser();
  const { toast } = useToast();

  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [isBooking, setIsBooking] = React.useState(false);
  
  const mentorDocRef = useMemoFirebase(
    () => (firestore && params.mentorId ? doc(firestore, "users", params.mentorId) : null),
    [firestore, params.mentorId]
  );
  const { data: mentor, isLoading } = useDoc<User>(mentorDocRef);

  // Hardcoded availability for this example. In a full app, this would be fetched from the mentor's profile.
  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];
  
  // Placeholder data for fields not yet in mentor profile
  const expertise = ['New Mentor'];
  const rating = 5.0;
  const reviews = 0;
  const price = 25;
  const role = "Expert Mentor";
  const company = "Orin Platform";

  const handleBooking = async () => {
    if (!currentUser) {
      router.push(`/signin?redirect=/mentors/${params.mentorId}`);
      return;
    }
    if (!date || !selectedTime || !mentor) {
        toast({
            title: "Booking Incomplete",
            description: "Please select a date and time to book a session.",
            variant: "destructive",
        });
      return;
    }
    setIsBooking(true);

    try {
        const bookingsCollection = collection(firestore, 'bookings');
        await addDoc(bookingsCollection, {
            studentId: currentUser.id,
            studentName: currentUser.displayName,
            mentorId: mentor.id,
            mentorName: mentor.displayName,
            subject: expertise.join(', '),
            date: date.toISOString().split('T')[0], // Store date as YYYY-MM-DD
            time: selectedTime,
            price: price,
            status: 'confirmed',
            createdAt: new Date().toISOString(),
        });

        toast({
            title: "Session Booked!",
            description: `Your session with ${mentor.displayName} on ${date.toLocaleDateString()} at ${selectedTime} is confirmed.`,
        });

        router.push('/dashboard');

    } catch (error) {
        console.error("Error booking session:", error);
        toast({
            title: "Booking Failed",
            description: "There was an error booking your session. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsBooking(false);
    }
  };


  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                  <Skeleton className="w-full md:w-48 h-48 rounded-lg" />
                  <div className="flex-grow space-y-3">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-8 w-1/4" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><Skeleton className="h-8 w-1/4" /></CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1 space-y-8">
              <Card><CardContent className="p-6"><Skeleton className="h-64 w-full" /></CardContent></Card>
              <Card><CardContent className="p-6"><Skeleton className="h-48 w-full" /></CardContent></Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!mentor) {
    notFound();
  }


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Mentor Details */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                <Image
                  src={mentor.photoURL || 'https://picsum.photos/seed/default-avatar/200/200'}
                  alt={`Photo of ${mentor.displayName || 'mentor'}`}
                  width={200}
                  height={200}
                  className="w-full md:w-48 md:h-48 rounded-lg object-cover"
                  data-ai-hint="professional portrait"
                />
                <div className="flex-grow">
                  <h1 className="text-3xl md:text-4xl font-bold font-headline">{mentor.displayName}</h1>
                  <p className="text-muted-foreground mt-1">{role} @ {company}</p>
                  <div className="flex items-center text-muted-foreground my-3">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-accent fill-accent mr-1" />
                      <span className="font-semibold">{rating.toFixed(1)}</span>
                      <span className="ml-1.5">({reviews} reviews)</span>
                    </div>
                  </div>
                   <div className="flex flex-wrap gap-2 my-4">
                    {expertise.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-base">{skill}</Badge>
                    ))}
                  </div>
                   <p className="text-lg font-semibold font-headline">${price}<span className="text-sm font-normal text-muted-foreground">/session</span></p>
                </div>
              </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        I am a passionate and experienced mentor ready to help students achieve their academic goals. My teaching philosophy revolves around building a strong conceptual foundation and developing critical thinking skills. I specialize in {expertise.join(', ')}.
                    </p>
                </CardContent>
             </Card>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CalendarIcon className="w-5 h-5"/> Select a Date</CardTitle>
                    <CardDescription>Choose an available date to see time slots.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border p-0"
                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                    />
                </CardContent>
             </Card>
             <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5"/> Select a Time</CardTitle>
                    <CardDescription>All times are in your local timezone.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map(time => (
                            <Button 
                                key={time} 
                                variant={selectedTime === time ? "default" : "outline"}
                                onClick={() => setSelectedTime(time)}
                            >
                                {time}
                            </Button>
                        ))}
                    </div>
                     {!currentUser && (
                         <Alert className="mt-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Sign in to book</AlertTitle>
                            <AlertDescription>
                                You need to be signed in to book a session with a mentor.
                            </AlertDescription>
                        </Alert>
                    )}
                    <Button 
                        className="w-full mt-6 h-12" 
                        onClick={handleBooking}
                        disabled={isBooking || !selectedTime}
                    >
                        {isBooking ? 'Booking...' : `Book Session for $${price}`}
                    </Button>
                </CardContent>
             </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

