import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useShoppingCart } from "use-shopping-cart";

interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  price_id: string;
  image: string;
}

export default function AddToBag({
  currency,
  description,
  name,
  price,
  price_id,
  image
}: ProductCart) {
  const { addItem } = useShoppingCart();

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    price_id: price_id,
    image: image,
  };

  const handleAddToCart = () => {
    addItem(product);

    toast.success("Added to cart");
  };

  return (
    <Button onClick={handleAddToCart} aria-label={`Add ${name} to cart`}>
      Add To Cart
    </Button>
  );
}
