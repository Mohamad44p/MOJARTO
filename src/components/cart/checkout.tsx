import { FC, useEffect, useState } from "react";
import { Toaster } from "sonner";

import { CheekoutForm } from "./CheckoutForm";
import { useParams } from "react-router-dom";

interface Product {
  name: string;
  description: string;
  price: number;
  mainImage?: {
    secure_url: string;
  };
}

const Checkout: FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products/${_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        return response.json();
      })
      .then((data) => {
        const productData: Product = {
          name: data.product.name,
          description: data.product.description,
          price: data.product.price,
          mainImage: data.product.mainImage,
        };
        setProduct(productData);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [_id]);

  return (
    <div className="mx-auto max-w-screen-xl my-16">
      <Toaster />
      <div className="grid gap-8 md:grid-cols-2">
        {product && (
          <div className="flex flex-col justify-center items-center">
            {product.mainImage && (
              <img
                src={product.mainImage.secure_url}
                alt={product.name}
                className="w-[300px] h-[500px] object-scale-down rounded-xl m-0"
                loading="lazy"
              />
            )}
            <h2 className="text-2xl font-bold text-white lg:text-3xl mb-5">
              {product.name}
            </h2>
            <p className="text-xl font-bold text-white md:text-2xl">
              ${product.price}
            </p>
          </div>
        )}

        <div>
          <CheekoutForm />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
