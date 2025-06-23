import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  bypassAuth: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleBypassAuth: () => void;
  setBypassAuth: (bypass: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BYPASS_AUTH_KEY = "jobblox_bypass_auth";
const MOCK_USER_KEY = "jobblox_mock_user";

const mockUser: User = {
  id: "dev-user-1",
  name: "John Developer",
  email: "john@jobblox.dev",
  role: "admin",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [bypassAuth, setBypassAuthState] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const savedBypass = localStorage.getItem(BYPASS_AUTH_KEY);
    const savedUser = localStorage.getItem(MOCK_USER_KEY);

    if (savedBypass === "true") {
      setBypassAuthState(true);
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          // If parsing fails, use mock user
          setUser(mockUser);
          setIsAuthenticated(true);
          localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
        }
      } else {
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, accept any email/password
    const loggedInUser: User = {
      id: "user-1",
      name: email.split("@")[0] || "User",
      email,
      role: "admin",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };

    setUser(loggedInUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    if (!bypassAuth) {
      localStorage.removeItem(MOCK_USER_KEY);
    }
  };

  const toggleBypassAuth = () => {
    const newBypass = !bypassAuth;
    setBypassAuth(newBypass);
  };

  const setBypassAuth = (bypass: boolean) => {
    setBypassAuthState(bypass);
    localStorage.setItem(BYPASS_AUTH_KEY, bypass.toString());

    if (bypass) {
      // Enable bypass mode - create mock user
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
    } else {
      // Disable bypass mode - clear auth state
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem(MOCK_USER_KEY);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    bypassAuth,
    login,
    logout,
    toggleBypassAuth,
    setBypassAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
