'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseConfig } from './config';
import type { User, AuthError } from 'firebase/auth';

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    return null;
  }
};

export const signUpWithEmailAndPassword = async (email: string, password: string): Promise<{ user: User | null, error: AuthError | null }> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error as AuthError };
  }
};

export const signInWithEmailAndPassword = async (email: string, password: string): Promise<{ user: User | null, error: AuthError | null }> => {
  try {
    const result = await firebaseSignInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error as AuthError };
  }
};


export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
  }
};

export { auth, onAuthStateChanged, type User };
