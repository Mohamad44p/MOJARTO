import { Link } from "react-router-dom";
import Dropdawonmenunav from "./Dropdawonmenunav";
import { UserNav } from "./UserNav";
import { FC } from "react";
import LogoNavbar from "../../assets/Logo.svg";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import { User } from "@/context/AuthContext";

interface NavbarProps {
  user: User | null;
  userToken: string | null | undefined;
}

const Navbar: FC<NavbarProps> = ({ user, userToken }) => {
  const { handleCartClick } = useShoppingCart();

  return (
    <nav className="w-full border-b">
      <div className="flex justify-between items-center container mx-auto px-5 lg:px-10 py-5">
        <Link className="flex gap-5" to="/">
            <img
              src={LogoNavbar}
              alt="MOJARTO Logo"
              width={23}
              height={23}
              loading="lazy"
              className="hidden lg:flex"
            />
             <img
            src={LogoNavbar}
            alt="logo"
            width={23}
            height={23}
            className="flex lg:hidden"
          />
          <div className="flex items-center gap-5">
            <p className=" lg:flex text-white">MOJARTO</p>
          </div>
         
        </Link>
        <div className="hidden lg:flex items-center gap-5 rounded-full border px-5 py-2">
          <Dropdawonmenunav />
          <Link to="/products" className="hover:text-[#ccc]">
            Products
          </Link>
          {userToken && (
            <Link to="/Orders" className="hover:text-[#ccc]">
              Orders
            </Link>
          )}
          <Link to="/contact" className="hover:text-[#ccc]">
            Contact
          </Link>
          <Button
            variant={"outline"}
            className="w-full rounded-full flex justify-center items-center gap-3"
          >
            <Link to="/add-payment-card">ADD Payment Card</Link>
          </Button>
        </div>

        <div className="lg:mr-0 ">
          <UserNav user={user} userToken={userToken} />
        </div>

        <div className="md:flex divide-x border-r sm:border-l">
          <Button
            onClick={() => handleCartClick()}
            variant={"outline"}
            className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 rounded-none"
          >
            <ShoppingBag />
            <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              Cart
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
