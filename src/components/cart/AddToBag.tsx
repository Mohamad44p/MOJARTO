import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useShoppingCart } from "use-shopping-cart";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  price_id: string;
}

export default function AddToBag({
  currency,
  description,
  name,
  price,
  price_id,
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    price_id: price_id,
  };
  return (
    <Button
      onClick={() => {
        toast.success("Added to cart");
        addItem(product), handleCartClick();
      }}
    >
      Add To Cart
    </Button>
  );
}