import { collection, query, QueryConstraint } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { FirebaseCollection } from './collections'

export const useCollection = (
  collectionId: FirebaseCollection,
  ...constraints: QueryConstraint[]
) => {
  const firestore = useFirestore()
  const col = collection(firestore, collectionId)
  const collectionQuery = query(col, ...constraints)

  const { status, data } = useFirestoreCollectionData(collectionQuery, {
    idField: 'id'
  })

  return { status, data }
}
