
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock data for demonstration purposes
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'admin@bloomteam.com',
    role: 'super_admin',
    avatar: '/assets/avatars/super-admin.png',
  },
  {
    id: '2',
    name: 'Team Leader',
    email: 'leader@bloomteam.com',
    role: 'team_leader',
    teamId: 'team1',
    avatar: '/assets/avatars/team-leader.png',
  },
  {
    id: '3',
    name: 'Employee',
    email: 'employee@bloomteam.com',
    role: 'employee',
    teamId: 'team1',
    avatar: '/assets/avatars/employee.png',
  }
];

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('bloomteam_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API request
    setIsLoading(true);
    try {
      // In a real application, this would be an API call
      const user = mockUsers.find(u => u.email === email);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCurrentUser(user);
      localStorage.setItem('bloomteam_user', JSON.stringify(user));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('bloomteam_user');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
