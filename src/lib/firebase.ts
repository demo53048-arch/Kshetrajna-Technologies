import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  getRedirectResult,
  User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot,
  getDocFromServer,
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";
import { ContactMessage, Application, Quote, StartedProject, Job, ServicePlan, CustomService } from "../types";

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize provider and configure list of Gmail scopes requested
export const provider = new GoogleAuthProvider();
provider.addScope("https://mail.google.com/");
provider.addScope("https://www.googleapis.com/auth/gmail.compose");
provider.addScope("https://www.googleapis.com/auth/gmail.send");
provider.addScope("https://www.googleapis.com/auth/gmail.readonly");
provider.addScope("https://www.googleapis.com/auth/gmail.modify");

// Verify firestore connection on load as requested by standard guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
  } catch (error) {
    if (error instanceof Error && error.message.includes("offline")) {
      console.warn("Firebase Firestore is currently offline. Verification pending client auth.");
    }
  }
}
testConnection();

// AUTH STATE ENGINE & IN-MEMORY TOKEN CACHING
let isSigningIn = false;
let cachedAccessToken: string | null = typeof window !== "undefined" ? sessionStorage.getItem("google_access_token") : null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  // Check for redirect result from Google sign-in
  getRedirectResult(auth)
    .then((result) => {
      if (result) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential?.accessToken) {
          cachedAccessToken = credential.accessToken;
          if (typeof window !== "undefined") {
            sessionStorage.setItem("google_access_token", credential.accessToken);
          }
          if (onAuthSuccess) onAuthSuccess(result.user, credential.accessToken);
        }
      }
    })
    .catch((error) => {
      console.error("Redirect sign-in error:", error);
      if (onAuthFailure) onAuthFailure();
    });

  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      // If the user is signed in, allow the app to render the authenticated UI.
      // Token may be handled separately via getRedirectResult.
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken || "");
      return;
    }

    cachedAccessToken = null;
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("google_access_token");
    }
    if (onAuthFailure) onAuthFailure();
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken || "";
    cachedAccessToken = accessToken;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("google_access_token", accessToken);
    }
    return { user: result.user, accessToken };
  } catch (error) {
    console.error("Google Authentication failed:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("google_access_token");
  }
};

// FIRESTORE HARDENED ERROR HANDLING SYSTEM (Mandatory Constraint)
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error("Firestore Error Block Triggered:", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// STRIP-BASED DATA OPERATION SERVICE (Real live database connections)

// 1. Inquiries Collection (messages)
export async function createMessageInDB(msg: ContactMessage) {
  const path = `messages/${msg.id}`;
  try {
    await setDoc(doc(db, "messages", msg.id), { ...msg });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function deleteMessageFromDB(id: string) {
  const path = `messages/${id}`;
  try {
    await deleteDoc(doc(db, "messages", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// 2. Applications Collection (applications)
export async function createApplicationInDB(app: Application) {
  const path = `applications/${app.id}`;
  try {
    await setDoc(doc(db, "applications", app.id), { ...app });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function deleteApplicationFromDB(id: string) {
  const path = `applications/${id}`;
  try {
    await deleteDoc(doc(db, "applications", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// 3. Quotes Collection (quotes)
export async function createQuoteInDB(quote: Quote) {
  const path = `quotes/${quote.id}`;
  try {
    await setDoc(doc(db, "quotes", quote.id), { ...quote });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateQuoteStatusInDB(id: string, status: string) {
  const path = `quotes/${id}`;
  try {
    await updateDoc(doc(db, "quotes", id), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteQuoteFromDB(id: string) {
  const path = `quotes/${id}`;
  try {
    await deleteDoc(doc(db, "quotes", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// 4. Projects Collection (plan purchases)
export async function createProjectInDB(project: StartedProject) {
  const path = `projects/${project.id}`;
  try {
    await setDoc(doc(db, "projects", project.id), { ...project });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateProjectStatusInDB(id: string, status: string) {
  const path = `projects/${id}`;
  try {
    await updateDoc(doc(db, "projects", id), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteProjectFromDB(id: string) {
  const path = `projects/${id}`;
  try {
    await deleteDoc(doc(db, "projects", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// 5. Jobs Collection (current openings)
export async function createJobInDB(job: Job) {
  const path = `jobs/${job.id}`;
  try {
    await setDoc(doc(db, "jobs", job.id), { ...job });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function deleteJobFromDB(id: string) {
  const path = `jobs/${id}`;
  try {
    await deleteDoc(doc(db, "jobs", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// 6. Service Plans Collection
export async function createServicePlanInDB(plan: ServicePlan) {
  const path = `service_plans/${plan.id}`;
  try {
    await setDoc(doc(db, "service_plans", plan.id), { ...plan });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function deleteServicePlanFromDB(id: string) {
  const path = `service_plans/${id}`;
  try {
    await deleteDoc(doc(db, "service_plans", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// 7. Custom Services Collection
export async function createCustomServiceInDB(service: CustomService) {
  const path = `custom_services/${service.id}`;
  try {
    await setDoc(doc(db, "custom_services", service.id), { ...service });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function deleteCustomServiceFromDB(id: string) {
  const path = `custom_services/${id}`;
  try {
    await deleteDoc(doc(db, "custom_services", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// 8. Update functions for all manageable entities to allow full editing
export async function updateJobInDB(job: Job) {
  const path = `jobs/${job.id}`;
  try {
    await setDoc(doc(db, "jobs", job.id), { ...job });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function updateServicePlanInDB(plan: ServicePlan) {
  const path = `service_plans/${plan.id}`;
  try {
    await setDoc(doc(db, "service_plans", plan.id), { ...plan });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function updateCustomServiceInDB(service: CustomService) {
  const path = `custom_services/${service.id}`;
  try {
    await setDoc(doc(db, "custom_services", service.id), { ...service });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

