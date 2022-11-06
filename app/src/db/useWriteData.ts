import { doc, setDoc } from 'firebase/firestore'
import { useCallback } from 'react'
import { useFirestore } from 'reactfire'
import { FirebaseCollection } from './collections'

export const useWriteData = <T>(table: FirebaseCollection, id: string) => {
  const db = useFirestore()
  const writeData = useCallback(async (data: T) => {
    console.log({ data })
    await setDoc(doc(db, `${table}`, id), data as unknown)
  }, [])

  return writeData
}
