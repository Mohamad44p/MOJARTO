import { createContext, useContext } from 'react';

export interface User {
  userToken: string | number | null; 
  email: string;
  image?: string;
  token?: string; 
}

export interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string, image: File) => Promise<void>; 
  signOut: () => Promise<void>;
  sendCode: (email: string) => Promise<void>;
  resetPassword: (email: string , password: string , code:string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  sendCode: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
});

export const useAuth = () => useContext(AuthContext);

export { AuthContext };
