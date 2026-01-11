import type { User } from "firebase/auth";
import { createContext } from "react";

export type AuthContextType = {
  user: User | null;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
