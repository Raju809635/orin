import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Button } from './ui/button';

type MentorCardProps = {
  name: string;
  imageUrl: string;
  imageHint: string;
  expertise: string[];
  rating: number;
  reviews: number;
  price: number;
};

const MentorCard = ({ name, imageUrl, imageHint, expertise, rating, reviews, price }: MentorCardProps) => {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg flex flex-col">
      <CardContent className="p-0 flex flex-col flex-grow">
        <div className="relative">
          <Image
            src={imageUrl}
            alt={`Photo of ${name}`}
            width={300}
            height={300}
            className="w-full h-48 object-cover"
            data-ai-hint={imageHint}
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-headline font-semibold text-lg">{name}</h3>
          <div className="flex items-center text-sm text-muted-foreground my-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-accent fill-accent mr-1" />
              <span>{rating.toFixed(1)}</span>
              <span className="ml-1">({reviews} reviews)</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 my-2">
            {expertise.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
          <div className="mt-auto pt-4 flex justify-between items-center">
            <p className="text-lg font-semibold font-headline">${price}<span className="text-sm font-normal text-muted-foreground">/session</span></p>
            <Button variant="link" className="p-0 h-auto">View Profile</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorCard;
