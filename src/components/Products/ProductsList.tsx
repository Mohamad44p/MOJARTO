import { FC, useEffect, useState } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { SkeltonCard } from "../shared/SkeletonCard";

interface Product {
  name: string;
  _id: string;
  description: string;
  mainImage: {
    secure_url: string;
  };
  slug: string;
}

const ProductsList: FC = () => {
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
    fetch(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10`)
      .then((response) => response.json())
      .then((data) => {
        const selectedProducts = data.products.map((product: Product) => ({
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
      <section className="container mx-atuo px-5 lg:px-10 mt-10">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          <SkeltonCard />
          <SkeltonCard />
          <SkeltonCard />
          <SkeltonCard />
          <SkeltonCard />
          <SkeltonCard />
          <SkeltonCard />
          <SkeltonCard />
          <SkeltonCard />
          <SkeltonCard />
          <SkeltonCard />
          <SkeltonCard />
          <SkeltonCard />
          <SkeltonCard />
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-8">
      <HoverEffect items={products} />
    </section>
  );
};

export default ProductsList;
