import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../common/firebase";

export const AuthContext = createContext({
  user: null,
  authLoading: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (!firebaseUser) {
          setUser(null);
          setAuthLoading(false);
          return;
        }

        const token = await getIdTokenResult(firebaseUser);

        setUser({
          ...firebaseUser,
          claims: token.claims,
        });
      } catch (err) {
        console.error("Auth error:", err);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
