
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
import { useCollection, useDoc, useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { doc, addDoc, collection, query, where, writeBatch } from "firebase/firestore";
import type { User } from "@/models/user";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TimeSlot } from "@/models/timeslot";

export default function MentorProfilePage() {
  const params = useParams<{ mentorId: string }>();
  const firestore = useFirestore();
  const router = useRouter();
  const { user: currentUser } = useUser();
  const { toast } = useToast();

  const [date, setDate] = React.useState<Date | undefined>();
  const [month, setMonth] = React.useState<Date | undefined>();
  const [minDate, setMinDate] = React.useState<Date | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<WithId<TimeSlot> | null>(null);
  const [isBooking, setIsBooking] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    
    setDate(today);
    setMonth(today);
    setMinDate(yesterday);
  }, []);

  const mentorDocRef = useMemoFirebase(
    () => (firestore && params.mentorId ? doc(firestore, "users", params.mentorId) : null),
    [firestore, params.mentorId]
  );
  const { data: mentor, isLoading: isMentorLoading } = useDoc<User>(mentorDocRef);

  const timeSlotsQuery = useMemoFirebase(
    () => {
      if (!firestore || !params.mentorId || !date) return null;
      const q = query(
        collection(firestore, "users", params.mentorId, "timeslots"),
        where("date", "==", date.toISOString().split("T")[0]),
        where("bookingStatus", "==", "available")
      );
      return q;
    },
    [firestore, params.mentorId, date]
  );
  const { data: timeSlots, isLoading: areSlotsLoading } = useCollection<TimeSlot>(timeSlotsQuery);
  
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
    if (!date || !selectedTimeSlot || !mentor || !firestore) {
        toast({
            title: "Booking Incomplete",
            description: "Please select a date and time to book a session.",
            variant: "destructive",
        });
      return;
    }
    if (currentUser.id === mentor.id) {
        toast({
            title: "Cannot Book Yourself",
            description: "You cannot book a session with yourself.",
            variant: "destructive",
        });
        return;
    }
    setIsBooking(true);

    try {
        const batch = writeBatch(firestore);

        // 1. Create the new booking document
        const newBookingRef = doc(collection(firestore, 'bookings'));
        batch.set(newBookingRef, {
            studentId: currentUser.id,
            studentName: currentUser.displayName,
            mentorId: mentor.id,
            mentorName: mentor.displayName,
            subject: expertise.join(', '),
            date: selectedTimeSlot.date,
            time: selectedTimeSlot.startTime,
            price: price,
            status: 'confirmed',
            createdAt: new Date().toISOString(),
        });

        // 2. Update the timeslot to mark it as booked
        const timeSlotRef = doc(firestore, "users", mentor.id, "timeslots", selectedTimeSlot.id);
        batch.update(timeSlotRef, { bookingStatus: 'booked' });

        await batch.commit();

        toast({
            title: "Session Booked!",
            description: `Your session with ${mentor.displayName} on ${new Date(selectedTimeSlot.date).toLocaleDateString()} at ${selectedTimeSlot.startTime} is confirmed.`,
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

  const isLoading = isMentorLoading || (!!date && areSlotsLoading);

  if (isLoading && !isMounted) {
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
                    {isMounted ? (
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            month={month}
                            onMonthChange={setMonth}
                            className="rounded-md border p-0"
                            disabled={(date) => !!minDate && date < minDate}
                        />
                    ) : (
                        <Skeleton className="w-[280px] h-[288px] rounded-md" />
                    )}
                </CardContent>
             </Card>
             <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5"/> Select a Time</CardTitle>
                    <CardDescription>All times are in your local timezone.</CardDescription>
                </CardHeader>
                <CardContent>
                    {areSlotsLoading || !isMounted ? <Skeleton className="h-20 w-full" /> : (
                      timeSlots && timeSlots.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map(slot => (
                                <Button 
                                    key={slot.id} 
                                    variant={selectedTimeSlot?.id === slot.id ? "default" : "outline"}
                                    onClick={() => setSelectedTimeSlot(slot)}
                                >
                                    {slot.startTime}
                                </Button>
                            ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">No available slots for this date.</p>
                      )
                    )}
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
                        disabled={isBooking || !selectedTimeSlot}
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

type WithId<T> = T & { id: string };
