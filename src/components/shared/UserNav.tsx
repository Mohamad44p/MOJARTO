import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userIcon from "../../assets/Avatar2.jpg";

import { LogOut, MenuIcon, SquareUserIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function UserNav() {
  const user = false;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className="h-6 w-6 lg:w-5 lg:h-5" />

          <img
            src={userIcon}
            alt="User image"
            width={20}
            height={20}
            className="rounded-full h-8 w-8 hidden lg:block"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {user ? (
          <>
            <div className="flex flex-col items-center justify-center gap-2">
              <Link
                to="/user-profile"
                className="w-full flex items-center justify-center gap-5 dark:text-white border border-primary-500 rounded-full px-5 py-2 hover:bg-secondary dark:hover:bg-primary-700"
              >
                Profile <SquareUserIcon className="h-5 w-5" />
              </Link>
              <Button
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
            <DropdownMenuItem className="flex items-center justify-center">
              <Link to="/sign-up">
                <Button variant={"outline"} className="w-full">
                  Sign up
                </Button>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
