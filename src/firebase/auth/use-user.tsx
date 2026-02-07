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

    // The user object from Firebase Auth has `uid`, but our app model uses `id`.
    // The `userData` from Firestore contains the `role` and other profile info.
    const finalUser: User = {
      // Start with auth data, mapping uid to id
      id: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      // Spread Firestore data. It will have `id`, `email`, and `role`.
      // It will overwrite properties from auth if they exist in the Firestore doc,
      // which is often desired (e.g., if user updates their display name in their profile).
      // Most importantly, it adds the `role`.
      ...(userData || {}),
    };
    return finalUser;
  }, [firebaseUser, userData]);

  return {
    user,
    isUserLoading: isAuthLoading || isDocLoading,
    userError,
  };
};
