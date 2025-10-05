import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { currentSession, signIn as libSignIn, signOut as libSignOut, signUp as libSignUp, requestPasswordReset, resetPassword, isAdmin, Session } from "@/lib/auth";

interface AuthState {
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => void;
  requestReset: (email: string) => Promise<{ resetToken: string }>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  isAdmin: boolean;
}

const Ctx = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSession(currentSession());
    setLoading(false);
  }, []);

  const value: AuthState = useMemo(() => ({
    session,
    loading,
    isAdmin: isAdmin(session?.email),
    signIn: async (email, password) => {
      const s = await libSignIn(email, password);
      setSession(s);
    },
    signUp: async (email, password, name) => { await libSignUp(email, password, name); },
    signOut: () => {
      libSignOut();
      setSession(null);
    },
    requestReset: async (email) => requestPasswordReset(email),
    resetPassword: async (token, newPassword) => { await resetPassword(token, newPassword); },
  }), [session, loading]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
