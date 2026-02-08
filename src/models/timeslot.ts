export interface TimeSlot {
    id: string;
    mentorId: string;
    date: string; // YYYY-MM-DD
    startTime: string; // e.g., "09:00", "14:30"
    endTime: string;
    bookingStatus: 'available' | 'booked';
}
