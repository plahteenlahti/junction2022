import { collection, Query, query, QueryConstraint } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { FirebaseCollection } from './collections'

type Status = 'loading' | 'error' | 'success'

export const useCollection = <T>(
  collectionId: FirebaseCollection,
  ...constraints: QueryConstraint[]
): { status: Status; data: T[] | undefined } => {
  const firestore = useFirestore()
  const col = collection(firestore, collectionId)
  const collectionQuery = query(col, ...constraints) as Query<T>

  const { status, data } = useFirestoreCollectionData<T>(collectionQuery, {
    idField: 'id'
  })

  return { status, data }
}
