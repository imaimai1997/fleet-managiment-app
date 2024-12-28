const serviceAccount = {
  project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  private_key_id: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n",
  ),
  client_email: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  client_id: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: "googleapis.com",
};
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const adminAuth = admin.auth();

const deleteUser = async (uid: string) => {
  try {
    await adminAuth.deleteUser(uid);
    console.log(`Successfully deleted user with UID: ${uid}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

const updateUser = async (uid: string, updateEmail: string) => {
  try {
    await adminAuth.updateUser(uid, {
      email: updateEmail,
    });

    console.log(`Successfully updated user with UID: ${uid}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export { adminAuth, deleteUser, updateUser };
