import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Categories } from "@/lib/context/NavLinks";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

interface Category {
  title: string;
  href: string;
  description: string;
}

interface CategoryImage {
  [key: string]: string;
}

const DropdownMenuNav = () => {
  const { pathname } = useLocation();
  const [categoryImages, setCategoryImages] = useState<CategoryImage>({});

  useEffect(() => {
    fetch(
      "https://ecommerce-node4.vercel.app/categories/active?page=1&limit=10"
    )
      .then((response) => response.json())
      .then((data) => {
        const images: CategoryImage = data.categories.reduce(
          (
            acc: CategoryImage,
            curr: { name: string; image: { secure_url: string } }
          ) => {
            acc[curr.name.toLowerCase()] = curr.image.secure_url;
            return acc;
          },
          {}
        );
        setCategoryImages(images);
      })
      .catch((error) =>
        console.error("Error fetching category images:", error)
      );
  }, []);

  return (
    <div>
      <NavigationMenu className="hidden lg:flex z-[50] list-none  hover:text-white">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:text-primary">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {Categories.map((category: Category) => (
                <li key={category.title}>
                  <Link
                    to={category.href}
                    title={category.title}
                    className={
                      pathname === category.href
                        ? "text-lg font-semibold text-white"
                        : "text-lg font-semibold  text-gray-300 transition duration-100 hover:text-white"
                    }
                  >
                    {category.title}
                  </Link>
                  <img
                    src={categoryImages[category.title.toLowerCase()]}
                    alt={category.title}
                    className=" w-10 h-16 object-cover rounded-lg"
                    loading="lazy"
                  />{" "}
                  <p className="text-sm text-gray-500 line-clamp-2">
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

export default DropdownMenuNav;
