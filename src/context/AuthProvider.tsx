import { useState, ReactNode, FC } from "react";
import { AuthContext, User } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.ok) {
      const userData = await response.json();
      setUser(userData.user);
      localStorage.setItem("userToken", userData.token);
    } else {
      throw new Error("Invalid email or password");
    }
  };

  const signUp = async (
    userName: string,
    email: string,
    password: string,
    image: File | null
  ) => {
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    if (image !== null) {
      formData.append("image", image);
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/signup`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const userData = await response.json();
      setUser(userData.user);
      return userData.token;
    } else {
      throw new Error("Email is already registered");
    }
  };
  const signOut = async () => {
    localStorage.removeItem("userToken");
    setUser(null);
    return Promise.resolve();
  };

  const sendCode = async (email: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/sendcode`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        console.log("Code sent successfully");
      } else {
        throw new Error("Failed to send code");
      }
    } catch (error) {
      console.error("Error sending code:", error);
      throw error;
    }
  };

  const resetPassword = async (
    email: string,
    password: string,
    code: string
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/forgotPassword`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, code }),
        }
      );

      if (response.ok) {
        console.log("Password reset successful");
      } else {
        throw new Error("Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        sendCode,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
