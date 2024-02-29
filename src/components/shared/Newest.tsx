import { Suspense, useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import { HoverEffect } from "@/components/ui/card-hover-effect";

interface Product {
  name: string;
  description: string;
  mainImage: {
    secure_url: string;
  };
  slug: string;
}

const Fallback = () => (
  <div className="max-w-5xl mx-auto px-8">
    {[...Array(8)].map((_, index) => (
      <div key={index} className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    ))}
  </div>
);

export function Newest() {
  const [products, setProducts] = useState<{
    title: string;
    description: string;
    link: string;
    image: string;
  }[]>([]);

  useEffect(() => {
    fetch("https://ecommerce-node4.vercel.app/products")
      .then((response) => response.json())
      .then((data) => {
        const selectedProducts = data.products
          .slice(0, 8)
          .map((product: Product) => ({
            title: product.name,
            description: product.description,
            link: `/products/${product.slug}`,
            image: product.mainImage.secure_url,
          }));
        setProducts(selectedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <Suspense fallback={<Fallback />}>
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={products} />
      </div>
    </Suspense>
  );
}