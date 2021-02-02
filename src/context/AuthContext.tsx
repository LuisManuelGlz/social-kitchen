import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import firebase from 'firebase';
import { auth, firestore } from '../firebase/config';

type AuthContextType = {
  user: firebase.User | null;
  setUser: Dispatch<SetStateAction<firebase.User | null>>;
  googleSignIn: () => void;
  signOut: () => void;
};

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  const googleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const { user } = await auth.signInWithPopup(provider);

      const doc = await firestore.collection('users').doc(user?.uid).get();

      if (!doc.exists) {
        const { uid: id, displayName, photoURL } = user!;
        await firestore
          .collection('users')
          .doc(user?.uid)
          .set({ id, displayName, photoURL });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        googleSignIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
