import React, {
  createContext,
  ReactNode,
} from 'react';
import firebase from 'firebase';
import { auth, firestore } from '../firebase/config';
import UserType from '../types/user';

type UserContextType = {
  fetchUserById: (id: string) => Promise<UserType | null>;
};

interface Props {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

const UserProvider = ({ children }: Props) => {
  const fetchUserById = async (id: string) => {
    let user = null;
    try {
      const doc = await firestore.collection('users').doc(id).get();
      user = { id: doc.id, ...doc.data() } as UserType;
    } catch (error) {
      console.log(error);
    }
    return user;
  };

  return (
    <UserContext.Provider
      value={{
        fetchUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
