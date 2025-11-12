import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Invitation } from "../types";
import { v4 as uuidv4 } from "uuid";

const COLLECTION_NAME = "invitations";

export const invitationService = {
  // Create a new invitation
  async create(
    invitationData: Omit<Invitation, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    const now = new Date().toISOString();
    const customId = uuidv4();
    const newInvitation: Invitation = {
      ...invitationData,
      id: customId,
      createdAt: now,
      updatedAt: now,
    };

    await addDoc(collection(db, COLLECTION_NAME), newInvitation);
    // Return the custom UUID instead of Firestore document ID
    return customId;
  },

  // Get invitation by ID
  async getById(id: string): Promise<Invitation | null> {
    // First try to get by document ID
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Invitation;
    }

    // If not found, search by the custom ID field
    const q = query(collection(db, COLLECTION_NAME));
    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      const data = doc.data() as Invitation;
      if (data.id === id) {
        return data;
      }
    }

    return null;
  },

  // Update invitation
  async update(id: string, updates: Partial<Invitation>): Promise<void> {
    // Find document by custom ID
    const q = query(collection(db, COLLECTION_NAME));
    const querySnapshot = await getDocs(q);

    for (const document of querySnapshot.docs) {
      const data = document.data() as Invitation;
      if (data.id === id) {
        const docRef = doc(db, COLLECTION_NAME, document.id);
        await updateDoc(docRef, {
          ...updates,
          updatedAt: new Date().toISOString(),
        });
        return;
      }
    }

    throw new Error(`Invitation with ID ${id} not found`);
  },

  // Delete invitation
  async delete(id: string): Promise<void> {
    // Find document by custom ID
    const q = query(collection(db, COLLECTION_NAME));
    const querySnapshot = await getDocs(q);

    for (const document of querySnapshot.docs) {
      const data = document.data() as Invitation;
      if (data.id === id) {
        const docRef = doc(db, COLLECTION_NAME, document.id);
        await deleteDoc(docRef);
        return;
      }
    }

    throw new Error(`Invitation with ID ${id} not found`);
  },

  // Get all invitations
  async getAll(): Promise<Invitation[]> {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as Invitation);
  },
};
