import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import signinImage from "../../assets/signinimage.png";
import { Input } from "../ui/input";
import { User } from "lucide-react";
import { Button } from "../ui/button";

function SignInForm() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signIn(formData.email, formData.password);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred during sign-in"
      );
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center flex-col gap-10 h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#43404026] p-10 ">
        <div className="flex justify-center">
          <img src={signinImage} alt="Sign in" className="w-2/3" loading="lazy" />
        </div>
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-white font-medium my-5">
            Welcome! Enter your details and start Buying, <br /> Products and
            Selling On MOJARTO.
          </p>
          <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSignIn} className="flex flex-col gap-3">
              <div className="relative">
                <User
                  color="#BDBDBD"
                  className="w-5 h-5 rounded-full absolute translate-y-2 left-2"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-[250px] bg-[#020202] placeholder:text-[#898989] placeholder:text-sm pl-8 rounded-full"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="relative">
                <User
                  color="#BDBDBD"
                  className="w-5 h-5 rounded-full absolute translate-y-2 left-2"
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-[250px] bg-[#020202] placeholder:text-[#898989] placeholder:text-sm pl-8 rounded-full"
                  value={formData.password}
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
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignInForm;
