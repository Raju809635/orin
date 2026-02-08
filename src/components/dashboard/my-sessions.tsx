"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCollection, useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import { Booking } from "@/models/booking";
import { Skeleton } from "../ui/skeleton";

type MySessionsProps = {
  role?: 'student' | 'mentor';
}

type WithId<T> = T & { id: string };

export default function MySessions({ role = 'student' }: MySessionsProps) {
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const filterField = role === 'student' ? 'studentId' : 'mentorId';

  const sessionsQuery = useMemoFirebase(
    () => (firestore && user ? query(collection(firestore, "bookings"), where(filterField, "==", user.id)) : null),
    [firestore, user, filterField]
  );
  const { data: sessions, isLoading: areSessionsLoading } = useCollection<Booking>(sessionsQuery);

  const upcomingSessions = sessions?.filter(s => new Date(s.date) >= new Date()) || [];
  const pastSessions = sessions?.filter(s => new Date(s.date) < new Date()) || [];

  const handleJoinSession = () => {
    toast({
      title: "Feature not available",
      description: "Video session functionality will be implemented soon.",
    });
  };

  const withLabel = role === 'student' ? 'with Mentor' : 'with Student';
  const nameKey = role === 'student' ? 'mentorName' : 'studentName';

  const isLoading = isUserLoading || areSessionsLoading;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Upcoming Sessions</h2>
        {isLoading ? (
          <div className="grid gap-6">
            <Skeleton className="h-24 w-full" />
          </div>
        ) : upcomingSessions.length > 0 ? (
          <div className="grid gap-6">
            {upcomingSessions.map(session => (
              <Card key={session.id}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{session.subject}</h3>
                    <p className="text-sm text-muted-foreground">{withLabel}: {session[nameKey]}</p>
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
            <Skeleton className="h-24 w-full" />
           </div>
         ) : pastSessions.length > 0 ? (
          <div className="grid gap-6">
            {pastSessions.map(session => (
              <Card key={session.id}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{session.subject}</h3>
                    <p className="text-sm text-muted-foreground">{withLabel}: {session[nameKey]}</p>
                    <p className="text-sm text-muted-foreground">{new Date(session.date).toLocaleDateString()}</p>
                  </div>
                  <Badge variant="secondary">{session.status}</Badge>
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
