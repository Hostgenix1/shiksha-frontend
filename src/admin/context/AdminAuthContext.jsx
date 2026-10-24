import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase, supabaseReady } from "../lib/supabaseClient";
import { fetchProfileForAuthUser } from "../data/supabaseRepo";

const AdminAuthContext = createContext(null);
const STORAGE_KEY = "shiksha_admin_user";

export const demoAdmin = {
  name: "Aarav Mehta",
  email: "admin@shiksha.com",
  password: "admin123",
  role: "Super Admin",
  phone: "+91 98100 11001",
};

const sessionFromProfile = (profile, email) => ({
  name: profile?.name || String(email || "").split("@")[0] || "Team member",
  email: profile?.email || email || "",
  role: profile?.role || "Counsellor",
  phone: profile?.phone || "",
});

const friendlyAuthError = (message) => {
  if (!message) return "Sign in failed. Please try again.";
  if (/invalid login credentials/i.test(message)) {
    return "Invalid email or password. Check your Supabase staff account.";
  }
  if (/email not confirmed/i.test(message)) {
    return "This email is not confirmed yet. Confirm it in Supabase Auth first.";
  }
  return message;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    if (supabaseReady) return null;
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch {
      return null;
    }
  });
  // Demo mode has no async session restore, so it is never "loading".
  const [authLoading, setAuthLoading] = useState(supabaseReady);

  useEffect(() => {
    if (!supabaseReady) return undefined;
    let active = true;

    const applySession = async (session) => {
      if (!session?.user) {
        if (active) {
          setAdmin(null);
          setAuthLoading(false);
        }
        return;
      }
      let profile = null;
      try {
        profile = await fetchProfileForAuthUser(session.user.id);
      } catch (error) {
        console.error("[supabase] profile lookup", error);
      }
      if (!active) return;
      setAdmin(sessionFromProfile(profile, session.user.email));
      setAuthLoading(false);
    };

    supabase.auth
      .getSession()
      .then(({ data }) => applySession(data?.session))
      .catch(() => {
        if (active) {
          setAuthLoading(false);
        }
      });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
    });

    return () => {
      active = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email, password) => {
    if (!supabaseReady) {
      const normalizedEmail = email.trim().toLowerCase();
      if (normalizedEmail !== demoAdmin.email || password !== demoAdmin.password) {
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
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error) {
      return { ok: false, error: friendlyAuthError(error.message) };
    }

    let profile = null;
    try {
      profile = data?.user ? await fetchProfileForAuthUser(data.user.id) : null;
    } catch (lookupError) {
      console.error("[supabase] profile lookup", lookupError);
    }
    setAdmin(sessionFromProfile(profile, data?.user?.email));
    return { ok: true };
  }, []);

  const demoLogin = useCallback(() => {
    if (supabaseReady) {
      return {
        ok: false,
        error: "Demo access is disabled because Supabase is configured. Sign in with your staff account.",
      };
    }
    return login(demoAdmin.email, demoAdmin.password);
  }, [login]);

  const logout = useCallback(() => {
    if (supabaseReady) {
      supabase.auth.signOut().catch((error) => {
        console.error("[supabase] sign out", error);
      });
    }
    setAdmin(null);
    if (!supabaseReady) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{ admin, login, demoLogin, logout, authLoading, supabaseReady }}
    >
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
