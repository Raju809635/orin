import MentorCard from '@/components/mentor-card';
import { mentors } from '@/lib/mentors-data';

export default function RecommendedMentors() {
  // Take the first 3 mentors as featured mentors.
  const featuredMentors = mentors.slice(0, 3);

  return (
    <div>
      <h2 className="text-2xl font-bold font-headline mb-4">Featured Mentors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredMentors.map(mentor => (
          <MentorCard
            key={mentor.id}
            name={mentor.name}
            imageUrl={mentor.imageUrl}
            imageHint={mentor.imageHint}
            expertise={mentor.expertise}
            rating={mentor.rating}
            reviews={mentor.reviews}
            price={mentor.price}
          />
        ))}
      </div>
    </div>
  );
}
