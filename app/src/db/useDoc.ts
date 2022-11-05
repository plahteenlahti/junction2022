import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire"
import { FirebaseCollection } from "./collections"

export const useDoc = (collectionId: FirebaseCollection, docId: string) => {
    const burritoRef = doc(useFirestore(), collectionId, docId);
    const { status, data } = useFirestoreDocData(burritoRef, {
        idField: 'id'
    });

    return { status, data }
}
