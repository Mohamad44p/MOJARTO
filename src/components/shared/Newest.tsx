import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { HoverEffect } from "@/components/ui/card-hover-effect";

interface Product {
  name: string;
  description: string;
  mainImage: {
    secure_url: string;
  };
  _id: string;
}

export function Newest() {
  const [products, setProducts] = useState<
    {
      title: string;
      description: string;
      link: string;
      image: string;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then((response) => response.json())
      .then((data) => {
        const selectedProducts = data.products
          .slice(0, 8)
          .map((product: Product) => ({
            title: product.name,
            description: product.description,
            link: `/products/${product._id}`,
            image: product.mainImage.secure_url,
          }));
        setProducts(selectedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-wrap items-center gap-9 max-w-5xl mx-auto px-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex  items-center gap-5 ">
            <Skeleton className="h-[125px] w-[250px] rounded-xl " />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={products} />
    </div>
  );
}
