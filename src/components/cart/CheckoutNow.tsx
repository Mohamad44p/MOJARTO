import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { ProductCart } from "./AddToBag";
import { toast } from "sonner";
import { useState } from "react";

export default function CheckoutNow({
  currency,
  description,
  name,
  price,
  price_id,
}: ProductCart) {
  const { checkoutSingleItem } = useShoppingCart();
  const [user, setUser] = useState(true);

  function buyNow(priceId: string) {
    checkoutSingleItem(priceId);
  }

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
      buyNow(product.price_id);
    } else {
      window.location.href = "/stripe/error";
      toast.error("Please login to checkout");
    }
  };

  return (
    <Button variant="outline" onClick={handleCheckout}>
      Checkout Now
    </Button>
  );
}
