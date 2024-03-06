import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import ImageGallery from "./ImageGallery";

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

  return (
    <div className="mx-auto h-screen max-w-screen-xl px-4 md:px-8 mt-20">
      <div className="grid gap-8 md:grid-cols-2">
        <ImageGallery images={product?.subImages || []} />

        <div className="md:py-8">
          <div className="mb-2 md:mb-3">
            <span className="mb-0.5 inline-block text-gray-200">
              {product?.categoryName}
            </span>
            <h2 className="text-2xl font-bold text-white lg:text-3xl">
              {product?.name}
            </h2>
          </div>
          <div className="mb-6 flex items-center gap-3 md:mb-10">
            <Button className="rounded-full gap-2 bg-primary/70">
              <span className="text-sm">4.2</span>
              <Star className="h-5 w-5" />
            </Button>
            <span className="text-sm text-gray-300 transition duration-100">
              56 Ratings
            </span>
          </div>
          <div className="mb-6">
            <div className="flex items-end gap-2">
              <span className="text-xl font-bold text-white md:text-2xl">
                ${product?.price}
              </span>
            </div>
            <span className="text-sm text-gray-300">
              Incl. vat plus shipping
            </span>
          </div>
          <div className="mb-6 flex items-center gap-2 text-gray-300">
            <Truck className="h-5 w-5 dark:text-gray-300" />
            <span className="text-sm dark:text-gray-300">2-4 day shipping</span>
          </div>
          <div className="flex gap-2.5">
            <Button variant={"outline"} className="rounded-full gap-2">
              Add to Bag
            </Button>
            <Button
              variant={"ghost"}
              className="rounded-full gap-2 text-black bg-primary"
            >
              Checkout Now
            </Button>
          </div>
          <p className="mt-12 text-base text-gray-400 tracking-wide">
            {product?.description}
          </p>
        </div>
      </div>
    </div>
  );
};
