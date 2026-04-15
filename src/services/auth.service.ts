import api from './api';
import { type LoginRequest, type RegisterRequest, type User } from '../types';

export const authService = {

  // 🔐 LOGIN
  // 🔐 LOGIN (MOCKED for Demo)
  login: async (data: LoginRequest) => {
    console.log("[Mock Auth] Logging in with:", data.email);
    
    const mockUser = {
      id: 1,
      email: data.email || "demo@example.com",
      name: "Demo User",
      role: "ADMIN" as const
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock-token-xyz');

    return { user: mockUser, token: 'mock-token-xyz' };
  },

  // 🔄 SWITCH ROLE
  switchRole: async (role: string) => {
    const response = await api.put(`/users/switch-role?role=${role}`);
    const result = response.data;
    
    if (result?.token) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify({
        id: result.id,
        email: result.email,
        name: result.name,
        role: result.role
      }));
    }
    return result;
  },

  // 📝 REGISTER
  // 📝 REGISTER (MOCKED for Demo)
  register: async (data: RegisterRequest) => {
    console.log("[Mock Auth] Registering:", data.email);
    return { id: 1, email: data.email, name: data.name };
  },

  // 🚪 LOGOUT
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = "/login";
  },

  // 👥 GET ALL USERS
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data as User[];
  },

  // 👤 CURRENT USER
  // 👤 CURRENT USER
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    
    // Return a default demo user if none exists
    if (!userStr) {
      const demoUser: User = {
        id: 1,
        email: "demo@taskflow.com",
        name: "Demo User",
        role: "ADMIN"
      };
      localStorage.setItem('user', JSON.stringify(demoUser));
      localStorage.setItem('token', 'demo-token');
      return demoUser;
    }

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
};