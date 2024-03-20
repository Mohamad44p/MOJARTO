import { FC, useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "@/context/AuthContext";

interface ProductPageProps {
  name: string;
  description: string;
  mainImage: {
    secure_url: string;
  };
  price: number;
  categoryName: string;
  subImages?: {
    secure_url: string;
  }[];
  user: User | null;
  userToken: string | null | undefined;
}

const ShoppingCartModal: FC<ProductPageProps> = ({ user, userToken }) => {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
  } = useShoppingCart();

  const { _id } = useParams<{ _id: string }>();
  const [, setProduct] = useState<ProductPageProps | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (_id) {
      fetch(`${import.meta.env.VITE_API_URL}/products/${_id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch product");
          }
          return response.json();
        })
        .then((data) => {
          setProduct({
            name: data.product.name,
            description: data.product.description,
            mainImage:
              data.product.subImages && data.product.subImages.length > 0
                ? data.product.subImages[0]
                : { secure_url: "" },
            price: data.product.price,
            categoryName: data.product.categoryName,
            subImages: data.product.subImages,
            user: user || null,
            userToken: userToken || null,
          });
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [_id, user, userToken]);

 

  const handleCheckout = () => {
    if (cartCount === 0) {
      toast.error("Your cart is empty");
      navigate("/products");
      return;
    }
    if (!userToken) {
      navigate("/sign-in");
      toast.error("Please login to continue");
      return;
    }
    navigate('/checkout');
  };
  

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw] z-[100]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto custom-scrollbars__content">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="py-6">You don't have any items in your cart</h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={entry.image as string}
                          alt="Product image"
                          loading="lazy"
                          width={100}
                          height={100}
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-white">
                            <h3>{entry.name}</h3>
                            <p className="ml-4">${entry.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                            {entry.description}
                          </p>
                        </div>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-300">QTY: {entry.quantity}</p>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => {
                                toast.success("Removed from cart");
                                removeItem(entry.id);
                              }}
                              className="font-medium text-primary text-gray-100 hover:text-gray-300"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium ">
              <p className="text-white">Subtotal:</p>
              <p className="text-white">${totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-300">
              Shipping and taxes are calculated at checkout.
            </p>

            <div className="mt-6 flex justify-center items-center">
              <Button onClick={handleCheckout}>Checkout Now</Button>
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p className="text-white">
                OR{" "}
                <button
                  onClick={() => handleCartClick()}
                  className="font-medium text-primary text-gray-100 hover:text-gray-300"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartModal;
