import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { toast } from "sonner";

interface ProductCart {
  currency: string;
  description: string;
  name: string;
  price: number;
  price_id: string;
}

export default function CheckoutNow({
  currency,
  description,
  name,
  price,
  price_id,
}: ProductCart) {
  const { checkoutSingleItem } = useShoppingCart();
  const [user] = useState(true); // Initialize user state
  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    price_id: price_id,
  };

  const handleCheckout = () => {
    if (user) {
      toast.loading("Redirecting...");
      checkoutSingleItem(product.price_id);
    } else {
      window.location.href = "/stripe/error";
      toast.error("Please login to checkout");
    }
  };

  return (
    <Button variant="outline" onClick={handleCheckout} aria-label="Checkout now">
      Checkout Now
    </Button>
  );
}