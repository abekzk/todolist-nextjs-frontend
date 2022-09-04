import { FIREBASE_CONFIG } from '../../configs/config';
import { initializeAnalytics } from 'firebase/analytics';
import { initializeApp, getApps } from 'firebase/app';

export function initFirebase() {
  if (typeof window != 'undefined' && !getApps().length) {
    // Initialize Firebase
    const app = initializeApp(FIREBASE_CONFIG);
    // Initialize Analytics and get a reference to the service
    initializeAnalytics(app);
  }
}
