import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
dotenv.config();

if (!admin.apps.length) {
  // Option 1: Use Service Account JSON (Recommended for dev)
  // Option 2: Use env variables
  
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // Replace \n in private key from .env file
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin SDK initialized successfully');
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const auth = admin.auth();
export const db = admin.firestore();
