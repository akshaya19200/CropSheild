import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  loginUser,
  registerUser,
  getCurrentUser
} from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    getCurrentUser()
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email, password) => {
    const response = await loginUser({
      email,
      password
    });

    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);

    return response;
  };

  const register = async (data) => {
    const response = await registerUser(data);

    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);

    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}