import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { getDb } from './firebase'
import type { SurpriseRequest } from '@/types'

export async function saveSurpriseRequest(
  data: Omit<SurpriseRequest, 'createdAt' | 'status'>
): Promise<string> {
  const db = getDb()
  const docRef = await addDoc(collection(db, 'surprise_requests'), {
    ...data,
    status: 'new',
    createdAt: serverTimestamp(),
  })
  return docRef.id
}
