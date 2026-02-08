"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type MySessionsProps = {
  role?: 'student' | 'mentor';
}

// Static data to prevent app crash
const upcomingSessions = [
  { id: '1', subject: 'Calculus II', withName: 'Dr. Evelyn Reed', date: 'July 30, 2024', time: '11:00 AM', status: 'confirmed' },
];

const pastSessions = [
    { id: 'p1', subject: 'Intro to Python', withName: 'John Smith', date: 'July 15, 2024', time: '02:00 PM', status: 'completed' },
    { id: 'p2', subject: 'Data Structures', withName: 'Jane Doe', date: 'July 10, 2024', time: '10:00 AM', status: 'completed' },
];

export default function MySessions({ role = 'student' }: MySessionsProps) {
  const { toast } = useToast();

  const handleJoinSession = () => {
    toast({
      title: "Feature not available",
      description: "Video session functionality will be implemented soon.",
    });
  };

  const withLabel = role === 'student' ? 'with' : 'with';
  const nameKey = role === 'student' ? 'mentorName' : 'studentName';
  
  // Create a version of the data with the correct name property for the role
  const staticUpcoming = upcomingSessions.map(s => ({...s, [nameKey]: s.withName}));
  const staticPast = pastSessions.map(s => ({...s, [nameKey]: s.withName}));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Upcoming Sessions</h2>
        {staticUpcoming.length > 0 ? (
          <div className="grid gap-6">
            {staticUpcoming.map(session => (
              <Card key={session.id}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{session.subject}</h3>
                    <p className="text-sm text-muted-foreground">{withLabel} {session[nameKey]}</p>
                    <p className="text-sm text-muted-foreground">{session.date} at {session.time}</p>
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
         {staticPast.length > 0 ? (
          <div className="grid gap-6">
            {staticPast.map(session => (
              <Card key={session.id}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{session.subject}</h3>
                    <p className="text-sm text-muted-foreground">{withLabel} {session[nameKey]}</p>
                    <p className="text-sm text-muted-foreground">{session.date}</p>
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
