import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import localforage from 'localforage';
import { UserData } from './Types';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (user: UserData) => void;
    logout: () => void;
    user: UserData | null;
    users: UserData[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);
    const [users, setUsers] = useState<UserData[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUsers: UserData[] | null = await localforage.getItem('users');
                if (storedUsers) {
                    setUsers(storedUsers);

                    const storedUserId = localStorage.getItem('currentUserId');
                    if (storedUserId) {
                        const authenticatedUser = storedUsers.find(u => String(u.id) === (storedUserId));
                        if (authenticatedUser) {
                            setUser(authenticatedUser);
                            setIsAuthenticated(true);
                        } 
                    }}
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [setUsers]);

    const login = async (userData: UserData) => {
        setIsAuthenticated(true);
        setUser(userData);
        try {
            const updatedUsers = [...users.filter(u => String(u.id) !== userData.id), userData];
            setUsers(updatedUsers);
            await localforage.setItem('users', updatedUsers);
            setUsers(updatedUsers);
            console.log(updatedUsers)
            localStorage.setItem('currentUserId', String(userData.id));
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const logout = async () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('currentUserId');
        
    
    };

    const authContextValue: AuthContextType = {
        isAuthenticated,
        login,
        logout,
        user,
        users,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
