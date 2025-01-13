"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { auth } from "@/utils/firebase";
import { User } from "firebase/auth";
import { UserData } from "../../type/UserData";
import { useRouter } from "next/navigation";

export type AuthContextType = {
  user: User | null;
  currentUser: UserData | null;
};
type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);
const fetchCurrentUser = async (id: string | undefined) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.user;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  // firebaseのログイン情報（ログイン状態・uuid）
  const [user, setUser] = useState<User | null>(null);
  // supabaseのログイン情報（名前・アドレス・権限）
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const value = {
    user,
    currentUser,
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
      const getUser = async () => {
        const data = await fetchCurrentUser(user?.uid);
        setCurrentUser(data);
      };
      getUser();
      if (user === null) {
        router.push("/signin");
      }
    });
    return () => {
      unsubscribed();
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType | null => {
  const context = useContext(AuthContext);

  return context;
};
