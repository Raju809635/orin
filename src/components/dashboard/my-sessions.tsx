"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const upcomingSessions = [
  { id: 1, mentor: 'Sarah Johnson', subject: 'JEE Physics', date: 'August 5, 2024', time: '4:00 PM' },
  { id: 2, mentor: 'David Chen', subject: 'NEET Biology', date: 'August 8, 2024', time: '11:00 AM' },
];

const pastSessions = [
  { id: 1, mentor: 'Priya Patel', subject: 'UPSC History', date: 'July 28, 2024', status: 'Completed' },
  { id: 2, mentor: 'Michael Rodriguez', subject: 'React Basics', date: 'July 25, 2024', status: 'Completed' },
];

export default function MySessions() {
  const { toast } = useToast();

  const handleJoinSession = () => {
    toast({
      title: "Feature not available",
      description: "Video session functionality will be implemented soon.",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Upcoming Sessions</h2>
        <div className="grid gap-6">
          {upcomingSessions.map(session => (
            <Card key={session.id}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{session.subject}</h3>
                  <p className="text-sm text-muted-foreground">with {session.mentor}</p>
                  <p className="text-sm text-muted-foreground">{session.date} at {session.time}</p>
                </div>
                <Button onClick={handleJoinSession}>Join Session</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Past Sessions</h2>
        <div className="grid gap-6">
          {pastSessions.map(session => (
            <Card key={session.id}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{session.subject}</h3>
                  <p className="text-sm text-muted-foreground">with {session.mentor}</p>
                  <p className="text-sm text-muted-foreground">{session.date}</p>
                </div>
                <Badge variant="secondary">{session.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
