import { doc, setDoc } from 'firebase/firestore'
import { useCallback } from 'react'
import { useFirestore } from 'reactfire'
import { FirebaseCollection } from './collections'

export const useWriteData = <T>(table: FirebaseCollection) => {
  const db = useFirestore()
  const writeData = useCallback(async (id: string, data: T) => {
    await setDoc(doc(db, `${table}`, id), data as unknown)
  }, [])

  return writeData
}
