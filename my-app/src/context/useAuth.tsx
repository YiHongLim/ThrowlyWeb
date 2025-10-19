import React, { useContext, useEffect, useState, ReactNode } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

type Props = { children: ReactNode };
type AuthContextType = { currentUser: User | null };
const AuthContext = React.createContext<AuthContextType>({ currentUser: null });

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), setCurrentUser);
        return unsubscribe;
    }, []);
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
