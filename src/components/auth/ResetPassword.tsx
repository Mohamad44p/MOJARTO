import { useState, useContext } from "react";
import { Input } from "../ui/input";
import Restpass from "../../assets/Restpass.png";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const { resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await resetPassword(email, password, code);
      toast.success("Password reset successful");
      navigate("/");
    } catch (error) {
      setError("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "code") setCode(value);
  };

  return (
    <main className="flex items-center justify-center flex-col gap-10 h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#43404026] p-10 ">
        <div className="flex justify-center">
          <img
            src={Restpass}
            alt="Reset Password Image"
            className="w-5/6"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-white font-medium my-5">
            Enter your email address, new password and verification code to
            reset!
          </p>
          <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="relative flex flex-col gap-6 mb-7">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-[250px] bg-[#020202] placeholder:text-[#898989] placeholder:text-sm pl-8 rounded-full"
                  value={email}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  className="w-[250px] bg-[#020202] placeholder:text-[#898989] placeholder:text-sm pl-8 rounded-full"
                  value={password}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="code"
                  placeholder="Verification Code"
                  className="w-[250px] bg-[#020202] placeholder:text-[#898989] placeholder:text-sm pl-8 rounded-full"
                  value={code}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-200 text-white font-bold py-2 px-4 rounded-full"
                disabled={loading}
              >
                {loading ? "Resetting Password..." : "Reset Password"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
