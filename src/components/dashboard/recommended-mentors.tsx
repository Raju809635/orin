"use client";

import MentorCard from '@/components/mentor-card';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { User } from '@/models/user';
import { collection, query, where, limit } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function RecommendedMentors() {
  const firestore = useFirestore();

  // Query for the first 3 mentors
  const mentorsQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'users'), where('role', '==', 'mentor'), limit(3)) : null),
    [firestore]
  );
  const { data: mentors, isLoading } = useCollection<User>(mentorsQuery);

  return (
    <div>
      <h2 className="text-2xl font-bold font-headline mb-4">Featured Mentors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
             <Card key={i}>
                <Skeleton className="w-full h-48" />
                <CardContent className="p-4 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                </CardContent>
            </Card>
          ))
        ) : (
          mentors?.map(mentor => (
            <MentorCard
              key={mentor.id}
              id={mentor.id}
              name={mentor.displayName || 'Unnamed Mentor'}
              role="Expert Mentor"
              company="Orin Platform"
              imageUrl={mentor.photoURL || 'https://picsum.photos/seed/default-avatar/300/300'}
              imageHint="professional portrait"
              expertise={['New Mentor']}
              rating={5}
              reviews={0}
              price={25}
            />
          ))
        )}
      </div>
    </div>
  );
}
