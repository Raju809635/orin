"use client";

import { useState, useEffect } from 'react';
import { recommendMentors, RecommendMentorsOutput } from '@/ai/flows/ai-mentor-recommendation';
import MentorCard from '@/components/mentor-card';
import { mentors as allMentors } from '@/lib/mentors-data';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export default function RecommendedMentors() {
  const [recommendations, setRecommendations] = useState<RecommendMentorsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getRecommendations() {
      try {
        setIsLoading(true);
        // Mock student data for demonstration
        const studentProfile = {
          academicGoals: "Prepare for JEE Mains and improve in Physics.",
          classLevel: "12th Grade",
          examTargets: ["JEE Mains"],
        };
        const result = await recommendMentors(studentProfile);
        setRecommendations(result);
      } catch (e) {
        setError("Could not fetch mentor recommendations.");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    getRecommendations();
  }, []);

  const recommendedMentorDetails = recommendations?.mentorRecommendations.map(rec => {
    const mentor = allMentors.find(m => m.id.toString() === rec.mentorId);
    return { ...mentor, ...rec };
  }).filter(m => m.name);

  return (
    <div>
      <h2 className="text-2xl font-bold font-headline mb-4">Recommended Mentors for You</h2>
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
             <Card key={i}>
                <CardContent className="p-4 space-y-4">
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
            </Card>
          ))}
        </div>
      )}
      {error && <p className="text-destructive">{error}</p>}
      {!isLoading && !error && recommendedMentorDetails && (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedMentorDetails.map(mentor => (
            <div key={mentor.id}>
              <MentorCard
                name={mentor.name!}
                imageUrl={mentor.imageUrl!}
                imageHint={mentor.imageHint!}
                expertise={mentor.expertise!}
                rating={mentor.rating!}
                reviews={mentor.reviews!}
                price={mentor.price!}
              />
              <Card className="mt-2 bg-accent/20">
                <CardContent className="p-4">
                   <p className="text-sm font-semibold">AI Recommendation ({mentor.matchPercentage}% match):</p>
                   <p className="text-sm text-muted-foreground italic">"{mentor.reason}"</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
       {!isLoading && !error && (!recommendedMentorDetails || recommendedMentorDetails.length === 0) && (
        <p>No recommendations available at the moment.</p>
      )}
    </div>
  );
}
