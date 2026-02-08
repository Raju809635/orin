"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { mentors } from "@/lib/mentors-data";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export default function MentorProfilePage() {
  const params = useParams<{ mentorId: string }>();
  const mentor = mentors.find(m => m.id.toString() === params.mentorId);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  if (!mentor) {
    notFound();
  }

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Mentor Details */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                <Image
                  src={mentor.imageUrl}
                  alt={`Photo of ${mentor.name}`}
                  width={200}
                  height={200}
                  className="w-full md:w-48 md:h-48 rounded-lg object-cover"
                  data-ai-hint={mentor.imageHint}
                />
                <div className="flex-grow">
                  <h1 className="text-3xl md:text-4xl font-bold font-headline">{mentor.name}</h1>
                  <p className="text-muted-foreground mt-1">{mentor.role} @ {mentor.company}</p>
                  <div className="flex items-center text-muted-foreground my-3">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-accent fill-accent mr-1" />
                      <span className="font-semibold">{mentor.rating.toFixed(1)}</span>
                      <span className="ml-1.5">({mentor.reviews} reviews)</span>
                    </div>
                  </div>
                   <div className="flex flex-wrap gap-2 my-4">
                    {mentor.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-base">{skill}</Badge>
                    ))}
                  </div>
                   <p className="text-lg font-semibold font-headline">${mentor.price}<span className="text-sm font-normal text-muted-foreground">/session</span></p>
                </div>
              </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        I am a passionate and experienced mentor with over 10 years of experience in helping students achieve their academic goals. My teaching philosophy revolves around building a strong conceptual foundation and developing critical thinking skills. I specialize in {mentor.expertise.join(', ')} and have a track record of helping students excel in competitive exams.
                    </p>
                </CardContent>
             </Card>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CalendarIcon className="w-5 h-5"/> Select a Date</CardTitle>
                    <CardDescription>Choose an available date to see time slots.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border p-0"
                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                    />
                </CardContent>
             </Card>
             <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5"/> Select a Time</CardTitle>
                    <CardDescription>All times are in your local timezone.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map(time => (
                            <Button key={time} variant="outline">{time}</Button>
                        ))}
                    </div>
                    <Button className="w-full mt-6 h-12">Book Session for ${mentor.price}</Button>
                </CardContent>
             </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
