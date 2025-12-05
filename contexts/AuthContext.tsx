'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, LoginRequest } from '@/lib/api';

interface User {
  userId: number;
  userEmail: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userEmail = localStorage.getItem('userEmail');
    const userId = localStorage.getItem('userId');

    if (accessToken && userEmail && userId) {
      setUser({
        userId: parseInt(userId),
        userEmail,
      });
    }
    setLoading(false);
  }, []);

  const login = async (data: LoginRequest) => {
    const response = await api.login(data);

    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('userEmail', response.userEmail);
    localStorage.setItem('userId', response.userId.toString());

    setUser({
      userId: response.userId,
      userEmail: response.userEmail,
    });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
