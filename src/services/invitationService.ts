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
    const newInvitation: Invitation = {
      ...invitationData,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), newInvitation);
    return docRef.id;
  },

  // Get invitation by ID
  async getById(id: string): Promise<Invitation | null> {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Invitation;
    }
    return null;
  },

  // Update invitation
  async update(id: string, updates: Partial<Invitation>): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  },

  // Delete invitation
  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
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
