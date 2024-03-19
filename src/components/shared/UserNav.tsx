import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userIcon from "../../assets/Avatar2.jpg";
import { LogOut, MenuIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { User, useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface UserNavProps {
  user: User | null;
  userToken: string | null | undefined;
}

export function UserNav({ user, userToken }: UserNavProps) {
  const isLoggedIn = userToken !== null;
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut()
      .then(() => {
        navigate(0);
      })
      .catch((e: Error) => {
        toast.error(e.message);
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className="h-6 w-6 lg:w-5 lg:h-5" />
          {isLoggedIn && user?.image ? (
            <img
              src={user?.image}
              alt="User image"
              width={20}
              height={20}
              loading="lazy"
              className="rounded-full h-8 w-8 hidden lg:block"
            />
          ) : (
            <img
              src={userIcon}
              alt="Default user image"
              width={20}
              height={20}
              loading="lazy"
              className="rounded-full h-8 w-8 hidden lg:block"
            />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {isLoggedIn ? (
          <>
            <div className="flex flex-col items-center justify-center gap-2">
              <Button
                variant={"outline"}
                className="w-full rounded-full flex justify-center items-center gap-3"
                onClick={() => navigate("/profile")}
              >
                Profile
              </Button>
              <Button
                onClick={handleLogout}
                variant={"outline"}
                className="w-full rounded-full flex justify-center items-center gap-3"
              >
                Log out <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <DropdownMenuItem className="flex items-center justify-center">
              <Link to="/sign-in">
                <Button
                  variant={"outline"}
                  className="w-full bg-white text-black"
                >
                  Sign in
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-center justify-center gap-9">
              <Link to="/sign-up">
                <Button variant={"outline"} className="w-full">
                  Sign up
                </Button>
              </Link>
              <Link to="/products" className="text-[17px] hover:text-[#ccc]">
                Products
              </Link>
              <Link to="/about" className="text-[17px] hover:text-[#ccc]">
                About
              </Link>
              <Link to="/contact" className="text-[17px] hover:text-[#ccc]">
                Contact
              </Link>
              <Button
                variant={"outline"}
                className="w-full rounded-full flex justify-center items-center gap-3"
              >
                <Link to="/add-payment-card">ADD Payment Card</Link>
              </Button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
