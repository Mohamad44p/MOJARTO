import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { FacebookIcon } from "lucide-react";
import LogoFooter from "../../assets/Logo.svg";

export default function Footer() {
  return (
    <footer className="border-t-2 border-[#858584] mx-auto w-full max-w-screen-2xl py-6">
      <div className="grid grid-cols-2 justify-center items-center gap-5 lg:grid-cols-3 border-b-2 border-[#858584] py-5 mb-2">
        <div className="flex flex-col gap-2 py-5">
          <Link to="/">
            <div className="flex items-center gap-5">
              <img
                src={LogoFooter}
                alt="logo"
                width={23}
                height={23}
                className="hidden lg:block"
              />
              <p className="hidden lg:block text-white">MOJARTO</p>
            </div>
            <img
              src="/Logo.svg"
              alt="logo"
              width={23}
              height={23}
              className="block lg:hidden"
            />
          </Link>
          <p className="text-[#ccc]">Since 2024</p>
          <p className="text-[#ccc]">Join our community</p>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/mohamad4xp?mibextid=nwBsNb"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/Mohamad44p"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubLogoIcon className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohamad-abuomar-0878772a1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInLogoIcon className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/mohamad.69s?igsh=MWg0YjdsaGl5a2NpYQ=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramLogoIcon className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <h1 className="text-white text-xl hover:text-slate-400 cursor-pointer">
            Explore
          </h1>
          <Link to="/products">
            <p className="text-[#ccc] hover:text-white">Products</p>
          </Link>
          <Link to="/about">
            <p className="text-[#ccc] hover:text-white">About</p>
          </Link>
          <Link to="/contact">
            <p className="text-[#ccc] hover:text-white">Contact</p>
          </Link>
        </div>

        <div className="flex flex-col items-start gap-5">
          <h1 className="text-white text-xl hover:text-slate-400 cursor-pointer">
            Join our weekly digest
          </h1>
          <p className="text-[#ccc] text-[10px]">
            Get exclusive promotions & updates straight to your inbox.
          </p>

          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="email"
              placeholder="Enter your email here"
              className="bg-white text-black"
            />
            <Button
              variant={"outline"}
              type="submit"
              className="text-white rounded-2xl p-5 hover:shadow-2xl hover:scale-110 hover:text-black"
              style={{
                background: "linear-gradient(270deg, #4287F6 0%, #D3E5FE 100%)",
              }}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <p className="text-[#ccc] text-sm py-4 ">
        © 2024 MOJARTO. All rights reserved
      </p>
    </footer>
  );
}
