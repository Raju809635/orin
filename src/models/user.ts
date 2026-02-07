export interface User {
  id: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  role: 'student' | 'mentor' | 'admin';
}
