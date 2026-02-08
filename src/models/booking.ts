
export interface Booking {
    id: string;
    studentId: string;
    studentName: string;
    mentorId: string;
    mentorName: string;
    date: string;
    time: string;
    subject: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    price: number;
    createdAt: string;
}
