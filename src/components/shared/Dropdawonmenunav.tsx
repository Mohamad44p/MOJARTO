import { Link, useLocation } from 'react-router-dom';
import { Categories } from "@/lib/context/NavLinks";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

const Dropdawonmenunav = () => {
  const { pathname } = useLocation(); 

  return (
    <div>
      <NavigationMenu className="hidden lg:flex z-[50] list-none hover:text-primary dark:hover:text-white">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {Categories.map((category) => ( 
                <li key={category.title}> 
                  <Link
                    to={category.href} 
                    title={category.title}
                    className={pathname === category.href ? "text-lg font-semibold text-primary dark:text-white" : "text-lg font-semibold text-gray-600 dark:text-gray-300 transition duration-100 dark:hover:text-white hover:text-primary"}
                  >
                    {category.title}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {category.description}
                  </p>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  );
};

export default Dropdawonmenunav;
