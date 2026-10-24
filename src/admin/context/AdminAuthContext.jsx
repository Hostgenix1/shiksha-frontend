import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext(null);
const STORAGE_KEY = "shiksha_admin_user";

export const demoAdmin = {
  name: "Aarav Mehta",
  email: "admin@shiksha.com",
  password: "admin123",
  role: "Super Admin",
  phone: "+91 98100 11001",
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (
      normalizedEmail !== demoAdmin.email ||
      password !== demoAdmin.password
    ) {
      return {
        ok: false,
        error: "Invalid credentials. Use the demo account shown below.",
      };
    }
    const session = {
      name: demoAdmin.name,
      email: demoAdmin.email,
      role: demoAdmin.role,
      phone: demoAdmin.phone,
    };
    setAdmin(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return { ok: true };
  };

  const demoLogin = () => login(demoAdmin.email, demoAdmin.password);

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, demoLogin, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};
