import React, { createContext, useContext, useEffect, useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  verified: boolean;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabaseUrl = `https://${projectId}.supabase.co`;
        const supabase = createClient(supabaseUrl, publicAnonKey);

        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const userData: User = {
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            picture: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
            verified: session.user.email_confirmed_at !== null,
          };
          setUser(userData);
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
              const userData: User = {
                id: session.user.id,
                name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
                email: session.user.email || '',
                picture: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                verified: session.user.email_confirmed_at !== null,
              };
              setUser(userData);
            } else if (event === 'SIGNED_OUT') {
              setUser(null);
            }
          }
        );

        setIsLoading(false);
        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Auth check failed:', error);
        // Check localStorage for demo user or admin
        const savedUser = localStorage.getItem('demo_user');
        const savedAdmin = localStorage.getItem('admin_user');
        if (savedAdmin) {
          setUser(JSON.parse(savedAdmin));
        } else if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    // Save to localStorage - different keys for admin vs regular users
    if (userData.isAdmin) {
      localStorage.setItem('admin_user', JSON.stringify(userData));
      localStorage.removeItem('demo_user'); // Remove any existing user login
    } else {
      localStorage.setItem('demo_user', JSON.stringify(userData));
      localStorage.removeItem('admin_user'); // Remove any existing admin login
    }
  };

  const logout = async () => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = `https://${projectId}.supabase.co`;
      const supabase = createClient(supabaseUrl, publicAnonKey);
      
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
    
    setUser(null);
    localStorage.removeItem('demo_user');
    localStorage.removeItem('admin_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};