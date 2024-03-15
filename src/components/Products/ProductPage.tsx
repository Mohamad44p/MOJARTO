// ProductPage.tsx

import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import ImageGallery from "./ImageGallery";
import AddToBag from "../cart/AddToBag";

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
}

export const ProductPage: FC<ProductPageProps> = () => {
  const { _id } = useParams<{ _id: string }>();
  const [product, setProduct] = useState<ProductPageProps | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
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
        });
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [_id]);

  const handleCheckout = () => {
    navigate(`/checkout/${_id}`);
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-8 mt-10 mb-20">
      <div className="grid gap-8 md:grid-cols-2">
        <ImageGallery images={product?.subImages || []} />

        <div className="md:py-8">
          <div className="mb-2 md:mb-3">
            <span className="block text-gray-200">{product?.categoryName}</span>
            <h2 className="text-2xl font-bold text-white lg:text-3xl">
              {product?.name}
            </h2>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <Button className="rounded-full bg-primary/70">
              <span className="text-sm">4.2</span>
              <Star className="h-5 w-5" />
            </Button>
            <span className="text-sm text-gray-300 transition duration-100">
              56 Ratings
            </span>
          </div>
          <div className="mb-4">
            <div className="flex items-end gap-2">
              <span className="text-xl font-bold text-white md:text-2xl">
                ${product?.price}
              </span>
            </div>
            <span className="text-sm text-gray-300">
              Incl. vat plus shipping
            </span>
          </div>
          <div className="mb-4 flex items-center gap-2 text-gray-300">
            <Truck className="h-5 w-5 dark:text-gray-300" />
            <span className="text-sm dark:text-gray-300">2-4 day shipping</span>
          </div>
          <div className="md:flex md:gap-5">
            <div className="mb-4 md:mb-0">
              <AddToBag
                name={product?.name || ""}
                description={product?.description || ""}
                price={product?.price || 0}
                currency={"USD"}
                price_id={""}
                image={product?.mainImage.secure_url || ""}
              />
            </div>
            <Button variant={"ghost"} onClick={handleCheckout}>
              Checkout Now
            </Button>
          </div>
          <p className="mt-8 text-base text-gray-400 tracking-wide">
            {product?.description}
          </p>
        </div>
      </div>
    </div>
  );
};
