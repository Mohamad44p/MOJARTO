import { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { CheekoutForm } from "./CheckoutForm";
import NoItem from "../Categorys/NoItem";

const CheckoutCart = () => {
  const { cartDetails } = useShoppingCart();

  useEffect(() => {
    if (cartDetails) {
      localStorage.setItem("checkedOutProducts", JSON.stringify(cartDetails));
    }
  }, [cartDetails]);

  if (!cartDetails) {
    return null; 
  }

  return (
    <div className="flex justify-evenly">
      <section className="overflow-y-scroll custom-scrollbars__content max-h-[900px]">
        {Object.values(cartDetails).length > 0 ? (
          Object.values(cartDetails).map((item) => (
            <div
              key={item.id}
              className="mx-auto max-w-md px-4 py-8 lg:max-w-7xl lg:px-8"
            >
              <div className="flex justify-between items-center">
                <div className="mt-6 grid grid-cols-2 gap-x-6 sm:grid-cols-2 lg:grid-cols-1 xl:gap-x-8">
                  <div className="group relative">
                    <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                      <img
                        src={item.image}
                        alt="Product image"
                        loading="lazy"
                        className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div>
                      <h3>{item.name}</h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-300">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm font-medium text-gray-300">
                      Price: ${item.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NoItem
            title="Your Cart is Empty"
            description="There are no products in your cart to checkout."
          />
        )}
      </section>
      <div className="w-1/3">
        <form className="mx-auto max-w-sm px-4 py-8 lg:max-w-xl lg:px-8">
          <CheekoutForm />
        </form>
      </div>
    </div>
  );
};

export default CheckoutCart;
