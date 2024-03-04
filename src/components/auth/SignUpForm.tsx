import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import signupImage from "../../assets/signupImage.png";
import { Input } from "../ui/input";
import { KeyRound, Lock, Mail, User } from "lucide-react";
import { Button } from "../ui/button";
import { z, ZodError } from "zod";

const schema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string(),
  image: z.instanceof(File).nullable(),
});

function SignUpForm() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null as File | null,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      schema.parse(formData);

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      setLoading(true);
      await signUp(formData.email, formData.password, formData.image as File);
      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.errors[0].message);
      } else {
        setError(
          error instanceof Error
            ? error.message
            : "An error occurred during sign-up"
        );
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col gap-10 h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#43404026] p-10 ">
        <div className="flex justify-center">
          <img
            src={signupImage}
            alt="Sign up"
            className="w-2/3"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col lg:items-start items-center  justify-start">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-white font-medium my-5">
            Welcome! Enter your details and start Buying, <br /> Products and
            Selling On MOJARTO.
          </p>
          <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSignUp} className="flex flex-col gap-3">
              <div className="relative">
                <User
                  color="#BDBDBD"
                  className="w-5 h-5 rounded-full absolute translate-y-2 left-2"
                />
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-[250px] bg-[#020202] placeholder:text-[#898989] placeholder:text-sm pl-8 rounded-full"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="relative">
                <Mail
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
                <Lock
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
              <div className="relative">
                <KeyRound
                  color="#BDBDBD"
                  className="w-5 h-5 rounded-full absolute translate-y-2 left-2"
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-[250px] bg-[#020202] placeholder:text-[#898989] placeholder:text-sm pl-8 rounded-full"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  style={{ color: "white" }}
                  className="w-[250px] bg-[#020202] text-white pl-8 rounded-full"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-200 text-white font-bold py-2 px-4 rounded-full"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
