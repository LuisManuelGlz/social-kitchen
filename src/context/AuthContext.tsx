import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import firebase from 'firebase';
import { auth } from '../firebase/config';

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
      await auth.signInWithPopup(provider);
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
