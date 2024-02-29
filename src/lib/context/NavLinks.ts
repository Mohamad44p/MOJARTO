import { Home, ShoppingCart, Folder, Info, Mail, UserPlus } from 'lucide-react';

export const Categories: { title: string; href: string; description: string }[] = [
  {
    title: "Men",
    href: "/Men",
    description:
      "For the man in your life Discover the latest trends in fashion at ChicStyleHub. Elevate your wardrobe with elegance and sophistication.",
  },
  {
    title: "Women",
    href: "/Women",
    description:
      "For the woman in your life Discover the latest trends in fashion at ChicStyleHub. Elevate your wardrobe with elegance and sophistication.",
  },
  {
    title: "Teens",
    href: "/Teens",
    description:
      "For the teen in your life Discover the latest trends in fashion at ChicStyleHub. Elevate your wardrobe with elegance and sophistication.",
  },
  {
    title: "Kids",
    href: "/Kids",
    description: "For the kid in your life Discover the latest trends in fashion at ChicStyleHub.",
  },
]

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