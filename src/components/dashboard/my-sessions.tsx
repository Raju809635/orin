
"use client";

import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCollection, useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";
import type { Booking } from "@/models/booking";

export default function MySessions() {
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const studentBookingsQuery = useMemoFirebase(
    () => user && firestore ? query(
      collection(firestore, 'bookings'),
      where('studentId', '==', user.id),
      orderBy('createdAt', 'desc')
    ) : null,
    [user, firestore]
  );
  const { data: bookings, isLoading: areBookingsLoading } = useCollection<Booking>(studentBookingsQuery);

  const { upcomingSessions, pastSessions } = useMemo(() => {
    if (!bookings) {
      return { upcomingSessions: [], pastSessions: [] };
    }
    const now = new Date();
    const upcoming: Booking[] = [];
    const past: Booking[] = [];

    bookings.forEach(booking => {
      const sessionDate = new Date(booking.date);
      // A simple time parser (not robust for all formats)
      const [time, period] = booking.time.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      let sessionHours = hours;
      if (period === 'PM' && hours < 12) sessionHours += 12;
      if (period === 'AM' && hours === 12) sessionHours = 0;
      sessionDate.setHours(sessionHours, minutes);

      if (sessionDate > now) {
        upcoming.push(booking);
      } else {
        past.push(booking);
      }
    });

    return { upcomingSessions: upcoming, pastSessions: past };
  }, [bookings]);

  const handleJoinSession = () => {
    toast({
      title: "Feature not available",
      description: "Video session functionality will be implemented soon.",
    });
  };

  const isLoading = isUserLoading || areBookingsLoading;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Upcoming Sessions</h2>
        {isLoading ? (
          <div className="grid gap-6">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : upcomingSessions.length > 0 ? (
          <div className="grid gap-6">
            {upcomingSessions.map(session => (
              <Card key={session.id}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{session.subject}</h3>
                    <p className="text-sm text-muted-foreground">with {session.mentorName}</p>
                    <p className="text-sm text-muted-foreground">{new Date(session.date).toLocaleDateString()} at {session.time}</p>
                  </div>
                  <Button onClick={handleJoinSession}>Join Session</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">You have no upcoming sessions.</p>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Past Sessions</h2>
         {isLoading ? (
          <div className="grid gap-6">
            <Skeleton className="h-24 w-full" />
          </div>
        ) : pastSessions.length > 0 ? (
          <div className="grid gap-6">
            {pastSessions.map(session => (
              <Card key={session.id}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{session.subject}</h3>
                    <p className="text-sm text-muted-foreground">with {session.mentorName}</p>
                    <p className="text-sm text-muted-foreground">{new Date(session.date).toLocaleDateString()}</p>
                  </div>
                  <Badge variant="secondary">{session.status === 'confirmed' ? 'Completed' : session.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
           <p className="text-muted-foreground">You have no past sessions.</p>
        )}
      </div>
    </div>
  );
}
