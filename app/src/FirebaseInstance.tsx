import React from "react";
import { getFirestore } from 'firebase/firestore';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';

export const FirebaseInstanceProvider: React.FC<React.PropsWithChildren> = ({children}) => {   
    const firestoreInstance = getFirestore(useFirebaseApp());
    return (
        <FirestoreProvider sdk={firestoreInstance}>
            {children}
        </FirestoreProvider>
    )
}