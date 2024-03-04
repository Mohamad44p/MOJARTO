import { Home, ShoppingCart, Folder, Info, Mail, UserPlus } from 'lucide-react';

export const Categories: { id: string; title: string; href: string; description: string }[] = [
  {
    id: "1",
    title: "Men's Fashion",
    href: "/products/category/1",
    description: "For the man in your life Discover the latest trends in fashion at Mojarto. Elevate your wardrobe with elegance and sophistication.",
  },
  {
    id: "",
    title: "Women's Fashion",
    href: "/products/category/2",
    description: "For the woman in your life Discover the latest trends in fashion at Mojarto. Elevate your wardrobe with elegance and sophistication.",
  },
  {
    id: "3",
    title: "Mobiles",
    href: "/products/category/3",
    description: "Explore the latest Mobiles at Mojarto.",
  },
  {
    id: "4",
    title: "Electronics",
    href: "/products/category/4",
    description: "Explore the latest Electronics at Mojarto.",
  },
  {
    id: "5",
    title: "Laptops & Accessories",
    href: "/products/category/5",
    description: "Explore the latest Laptops and accessories at Mojarto.",
  },
];


export const sidebarLinks = [
  {
    Icon: Home,
    route: "/",
    label: "Home",
  },
  {
    Icon: ShoppingCart,
    route: "/products",
    label: "Products",
  },
  {
    Icon: Folder,
    route: "/categories",
    label: "Categories",
  },
  {
    Icon: Info,
    route: "/about",
    label: "About",
  },
  {
    Icon: Mail,
    route: "/contact",
    label: "Contact",
  },
  {
    Icon: UserPlus,
    route: "/sign-up",
    label: "Sign Up",
  }
];