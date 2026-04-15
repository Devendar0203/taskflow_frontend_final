
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
  // 🔄 SWITCH ROLE (MOCKED for Demo)
  switchRole: async (role: string) => {
    console.log("[Mock Auth] Switching role to:", role);
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      const newUser = { ...currentUser, role: role as 'ADMIN' | 'USER' };
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    }
    return null;
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
  // 👥 GET ALL USERS (MOCKED for Demo)
  getAllUsers: async () => {
    return [
      { id: 1, name: 'Demo User', email: 'demo@taskflow.com', role: 'ADMIN' },
      { id: 2, name: 'John Doe', email: 'john@example.com', role: 'USER' }
    ] as User[];
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