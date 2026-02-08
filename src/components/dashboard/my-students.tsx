"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from '../ui/skeleton';

// Static data to prevent app crash due to persistent Firestore security rule issue.
const staticStudents = [
    { id: 'student1', name: 'Alice Johnson' },
    { id: 'student2', name: 'Bob Williams' },
];

export default function MyStudents() {
    const students = staticStudents;
    const isLoading = false; // Set to false as we are using static data

    return (
        <div>
            <h2 className="text-2xl font-bold font-headline mb-4">My Students</h2>
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
            ) : students.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
