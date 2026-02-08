"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';
import { TimeSlot } from '@/models/timeslot';
import { Skeleton } from '../ui/skeleton';

type WithId<T> = T & { id: string };

export default function ManageAvailability() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [newTime, setNewTime] = useState('');

  const timeSlotsQuery = useMemoFirebase(() => {
    if (!firestore || !user || !date) return null;
    return query(
      collection(firestore, 'users', user.id, 'timeslots'),
      where('date', '==', date.toISOString().split('T')[0])
    );
  }, [firestore, user, date]);

  const { data: timeSlots, isLoading: areSlotsLoading } = useCollection<TimeSlot>(timeSlotsQuery);

  const handleAddTimeSlot = async () => {
    if (!firestore || !user || !date || !newTime) {
      toast({ title: "Error", description: "Please select a date and enter a time.", variant: "destructive" });
      return;
    }

    try {
      await addDoc(collection(firestore, 'users', user.id, 'timeslots'), {
        mentorId: user.id,
        date: date.toISOString().split('T')[0],
        startTime: newTime,
        endTime: '', // Can be extended to support durations
        bookingStatus: 'available'
      });
      toast({ title: "Success", description: "Time slot added." });
      setNewTime('');
    } catch (error) {
      console.error("Error adding time slot:", error);
      toast({ title: "Error", description: "Could not add time slot.", variant: "destructive" });
    }
  };

  const handleDeleteTimeSlot = async (slotId: string) => {
    if (!firestore || !user) return;

    try {
      await deleteDoc(doc(firestore, 'users', user.id, 'timeslots', slotId));
      toast({ title: "Success", description: "Time slot removed." });
    } catch (error) {
      console.error("Error deleting time slot:", error);
      toast({ title: "Error", description: "Could not remove time slot.", variant: "destructive" });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-headline mb-4">Manage Your Availability</h2>
      <Card>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <h3 className="font-semibold mb-2">1. Select a Date</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(d) => d < new Date(new Date().setDate(new Date().getDate() - 1))}
            />
          </div>
          <div>
            <h3 className="font-semibold mb-2">2. Add & View Time Slots</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                />
                <Button onClick={handleAddTimeSlot}>Add</Button>
              </div>

              <div className="space-y-2">
                <Label>Available Slots for {date ? date.toLocaleDateString() : '...'}</Label>
                {areSlotsLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ) : timeSlots && timeSlots.length > 0 ? (
                  <div className="space-y-2">
                    {timeSlots.map((slot) => (
                      <div key={slot.id} className="flex items-center justify-between p-2 border rounded-md bg-secondary">
                        <span className="font-mono">{slot.startTime}</span>
                        {slot.bookingStatus === 'available' ? (
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleDeleteTimeSlot(slot.id)}>
                            <X className="w-4 h-4" />
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground font-semibold uppercase">Booked</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground pt-2">No time slots added for this date.</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}