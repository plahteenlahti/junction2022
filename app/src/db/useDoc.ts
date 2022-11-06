import { doc, DocumentReference } from 'firebase/firestore'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import { FirebaseCollection } from './collections'

type Status = 'loading' | 'error' | 'success'

export const useDoc = <T>(
  collectionId: FirebaseCollection,
  docId: string
): { status: Status; data: T | undefined } => {
  const burritoRef = doc(
    useFirestore(),
    collectionId,
    docId
  ) as DocumentReference<T>
  const { status, data } = useFirestoreDocData<T>(burritoRef, {
    idField: 'id'
  })

  return { status, data }
}
