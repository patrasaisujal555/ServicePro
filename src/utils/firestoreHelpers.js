// src/utils/firestoreHelpers.js
import { collection, getDocs, query, orderBy, getDoc, doc, addDoc, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export async function fetchServices() {
  const q = query(collection(db, 'services'), orderBy('title'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function fetchServiceById(id) {
  const d = await getDoc(doc(db, 'services', id));
  return d.exists() ? { id: d.id, ...d.data() } : null;
}

export async function createBooking(data) {
  const docRef = await addDoc(collection(db, 'bookings'), {
    ...data,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

export async function fetchBookingsForUser(uid) {
  const q = query(collection(db, 'bookings'), where('userId','==',uid), orderBy('createdAt','desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}