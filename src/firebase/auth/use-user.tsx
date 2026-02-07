'use client';

import { useMemo } from 'react';
import { useUser as useFirebaseUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { User } from '@/models/user';

export interface UseUserResult {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

export const useUser = (): UseUserResult => {
  const { user: firebaseUser, isUserLoading: isAuthLoading, userError } = useFirebaseUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (firestore && firebaseUser ? doc(firestore, 'users', firebaseUser.uid) : null),
    [firestore, firebaseUser]
  );

  const { data: userData, isLoading: isDocLoading } = useDoc<User>(userDocRef);

  const user = useMemo(() => {
    if (!firebaseUser) return null;
    return {
      ...firebaseUser,
      ...userData,
    } as User;
  }, [firebaseUser, userData]);

  return {
    user,
    isUserLoading: isAuthLoading || isDocLoading,
    userError,
  };
};
