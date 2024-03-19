import { useState, useContext } from "react";
import { Input } from "../ui/input";
import Forgetpas from "../../assets/Forgetpas.png";
import { Button } from "../ui/button";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const { sendCode } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await sendCode(email);
      navigate("/reset-password")
    } catch (error) {
      setError("Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <main className="flex items-center justify-center flex-col gap-10 h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#43404026] p-10 ">
        <div className="flex justify-center">
          <img
            src={Forgetpas}
            alt="Forget Password Image"
            className="w-5/6"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-white font-medium my-5">
            Welcome! Enter your email address to reset your password.
          </p>
          <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-[250px] bg-[#020202] placeholder:text-[#898989] placeholder:text-sm pl-8 rounded-full"
                  value={email}
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
                {loading ? "Sending Code..." : "Send Code"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
