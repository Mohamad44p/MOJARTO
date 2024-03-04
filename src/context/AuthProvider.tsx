import { useState, ReactNode, FC } from "react";
import { AuthContext, User } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const user = await response.json();
      setUser(user);
    } else {
      throw new Error("Invalid email or password");
    }
  };

  const signUp = async (email: string, password: string, image: File | null)  => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    if (image !== null) {
      formData.append('image', image);
    }
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
      method: "POST",
      body: formData,
    });
    
    if (response.ok) {
      const user = await response.json();
      setUser(user);
    } else {
      throw new Error("Email is already registered");
    }
  };

  const signOut = async () => {
    await fetch("/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setUser(null);
  };

  const sendEmailVerification = async (email: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log("Email verification sent successfully");
      } else {
        throw new Error("Failed to send email verification");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error sending email verification:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const response = await fetch("/api/auth/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log("Password reset instructions sent successfully");
      } else {
        throw new Error("Failed to send password reset instructions");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Error sending password reset instructions:",
          error.message
        );
      } else {
        console.error("An unexpected error occurred:", error);
      }
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
        sendEmailVerification,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
