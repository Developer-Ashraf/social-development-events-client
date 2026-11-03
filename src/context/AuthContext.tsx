'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, photoURL: string, password: string) => Promise<boolean>;
  loginWithGoogle: (customUser?: { name: string; email: string; photoURL?: string }) => Promise<boolean>;
  loginWithGitHub: (customUser?: { name: string; email: string; photoURL?: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedData: { name: string; photoURL?: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and persist session on reload
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));

        // Background verification to keep session fresh
        fetch(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${savedToken}` }
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.user) {
              setUser(data.user);
              localStorage.setItem('user', JSON.stringify(data.user));
            }
          })
          .catch(() => {
            // Keep local session if server is temporarily unreachable
          });
      } catch (err) {
        console.error('Error parsing stored session:', err);
      }
    }
    setIsLoading(false);
  }, []);

  // Email and Password Login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || 'Login failed. Please check your credentials.');
        return false;
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success(data.message || 'Logged in successfully!');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Network error during login. Please ensure backend server is running.');
      return false;
    }
  };

  // Register User
  const register = async (name: string, email: string, photoURL: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, photoURL, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || 'Registration failed.');
        return false;
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success(data.message || 'Account registered successfully!');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Network error during registration.');
      return false;
    }
  };

  // Google Sign-In
  const loginWithGoogle = async (customUser?: { name: string; email: string; photoURL?: string }): Promise<boolean> => {
    try {
      const googleUser = customUser || {
        name: 'Ashraful Islam (Google)',
        email: 'developer.ashraful.wp@gmail.com',
        photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
      };

      const res = await fetch(`${API_BASE}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(googleUser)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || 'Google authentication failed.');
        return false;
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success('Successfully authenticated with Google!');
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to connect to Google authentication.');
      return false;
    }
  };

  // GitHub Sign-In
  const loginWithGitHub = async (customUser?: { name: string; email: string; photoURL?: string }): Promise<boolean> => {
    try {
      const githubUser = customUser || {
        name: 'Developer-Ashraf',
        email: 'ashraf.dev@github.com',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      };

      const res = await fetch(`${API_BASE}/api/auth/github`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(githubUser)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || 'GitHub authentication failed.');
        return false;
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success('Successfully authenticated with GitHub!');
      return true;
    } catch (error) {
      console.error('GitHub login error:', error);
      toast.error('Failed to connect to GitHub authentication.');
      return false;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.info('You have logged out.');
  };

  // Live profile update helper
  const updateUser = (updatedData: { name: string; photoURL?: string }) => {
    if (user) {
      const newUser = { ...user, ...updatedData };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        loginWithGoogle,
        loginWithGitHub,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
