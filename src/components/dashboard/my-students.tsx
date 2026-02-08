"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from '../ui/skeleton';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Booking } from '@/models/booking';

export default function MyStudents() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    const bookingsQuery = useMemoFirebase(
        () => (firestore && user ? query(collection(firestore, "bookings"), where("mentorId", "==", user.id)) : null),
        [firestore, user]
    );
    const { data: bookings, isLoading: areBookingsLoading } = useCollection<Booking>(bookingsQuery);

    const students = React.useMemo(() => {
        if (!bookings) return [];
        const studentMap = new Map<string, { id: string; name: string }>();
        bookings.forEach(booking => {
            if (!studentMap.has(booking.studentId)) {
                studentMap.set(booking.studentId, { id: booking.studentId, name: booking.studentName });
            }
        });
        return Array.from(studentMap.values());
    }, [bookings]);

    const isLoading = isUserLoading || areBookingsLoading;

    return (
        <div>
            <h2 className="text-2xl font-bold font-headline mb-4">My Students</h2>
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
            ) : students.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {students.map(student => (
                        <Card key={student.id}>
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-lg">{student.name}</h3>
                                <p className="text-sm text-muted-foreground">View booking history</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">You have no students yet.</p>
            )}
        </div>
    );
}
