// SECURITY: Server-side Firebase Admin SDK initialization.
// Uses Application Default Credentials in production (set FIREBASE_SERVICE_ACCOUNT_JSON
// or GOOGLE_APPLICATION_CREDENTIALS env var). Never expose admin credentials to client.

import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let app: App | undefined;

function getAdminApp(): App {
  if (app) return app;
  const existing = getApps();
  if (existing.length > 0) {
    app = existing[0];
    return app;
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (raw) {
    try {
      const credentials = JSON.parse(raw);
      app = initializeApp({ credential: cert(credentials) });
      return app;
    } catch (err) {
      console.error("Invalid FIREBASE_SERVICE_ACCOUNT_JSON:", err);
    }
  }

  // Fallback: applicationDefault() via GOOGLE_APPLICATION_CREDENTIALS
  app = initializeApp();
  return app;
}

export const adminAuth = () => getAuth(getAdminApp());
export const adminDb = () => getFirestore(getAdminApp());
