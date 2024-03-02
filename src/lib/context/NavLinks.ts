import { Home, ShoppingCart, Folder, Info, Mail, UserPlus } from 'lucide-react';

export const Categories: { title: string; href: string; description: string }[] = [
  {
    title: "men's fashion",
    href: "/Men",
    description:
      "For the man in your life Discover the latest trends in fashion at Mojarto. Elevate your wardrobe with elegance and sophistication.",
  },
  {
    title: "women's fashion",
    href: "/Women",
    description:
      "For the woman in your life Discover the latest trends in fashion at Mojarto. Elevate your wardrobe with elegance and sophistication.",
  },
  {
    title: "Mobiles",
    href: "/mobiles",
    description:
      "Explore the latest Mobiles at Mojarto.",
  },
  {
    title: "Electronics",
    href: "/electronics",
    description: "Explore the latest Electronics at Mojarto.",
  },
  {
    title: "laptops & accessories",
    href: "/laptops&accessories",
    description: "Explore the latest Laptops and accessories at Mojarto.",
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