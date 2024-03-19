import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useShoppingCart } from "use-shopping-cart";
import { CartEntry } from "use-shopping-cart/core";

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
  image,
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    price_id: price_id,
    image: image,
  };
  const { cartDetails } = useShoppingCart();

  const handleAddToCart = () => {
    const existingProduct = Object.values<CartEntry>(cartDetails || {}).find(
      (item: CartEntry) => item.name === product.name
    );

    if (existingProduct) {
      addItem(existingProduct);
      toast("Adding Quantity");
      handleCartClick();
    } else {
      addItem(product);
      toast("Added to cart");
      handleCartClick();
    }
  };
  return (
    <Button onClick={handleAddToCart} aria-label={`Add ${name} to cart`}>
      Add To Cart
    </Button>
  );
}
