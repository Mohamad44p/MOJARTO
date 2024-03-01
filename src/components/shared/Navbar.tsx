import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Dropdawonmenunav from "./Dropdawonmenunav";
import { UserNav } from "./UserNav";
import { FC } from "react";
import LogoNavbar from "../../assets/Logo.svg";
import { Button } from "../ui/button";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <nav className="w-full border-b">
      <div className="flex justify-between items-center container mx-auto px-5 lg:px-10 py-5">
        <Link to="/">
          <div className="flex items-center gap-5">
            <img
              src={LogoNavbar}
              alt="logo"
              width={23}
              height={23}
              className="hidden lg:block"
            />
            <p className="hidden lg:block text-white">MOJARTO</p>
          </div>
          <img
            src={LogoNavbar}
            alt="logo"
            width={23}
            height={23}
            className="block lg:hidden"
          />
        </Link>
        <div className="hidden lg:flex items-center gap-5 rounded-full border px-5 py-2">
          <Dropdawonmenunav />

          <Link to="/products" className="hover:text-[#ccc]">
            Products
          </Link>
          <Link to="/about" className="hover:text-[#ccc]">
            About
          </Link>
          <Link to="/contact" className="hover:text-[#ccc]">
            Contact
          </Link>
          <Button variant={"outline"} className="w-full rounded-full flex justify-center items-center gap-3">
          <Link to="/add-payment-card">
            ADD Payment Card
          </Link>
          </Button>
        </div>

        <div>
          <UserNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
