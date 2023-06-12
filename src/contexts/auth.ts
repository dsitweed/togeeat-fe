import { createContext } from "react";

interface IUser {
  name: string;
  age: number;
  description: string;
  avatar: string;
  phone: string;
  backgroundImage: string;
  address: string;
  nationality: string;
  languageSkills: string;
  isPublic: true;
}

interface AuthState {
  user: IUser | null;
  fetchUserFromStorage: () => void;
}

export function getUserFromStorage() {
  try {
    const userRaw = localStorage.getItem("user");
    if (userRaw) {
      return JSON.parse(userRaw) as IUser;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export function getTokenFromStorage() {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const AuthContext = createContext<AuthState>({
  user: getUserFromStorage(),
  fetchUserFromStorage: () => {},
});
