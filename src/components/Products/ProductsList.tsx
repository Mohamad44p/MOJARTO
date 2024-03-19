// ProductsList.tsx
import { FC, useEffect, useState } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { SkeltonCard } from "../shared/SkeletonCard";
import SearchInput from "./SearchInput";
import PriceRangeInputs from "./PriceRangeInputs";
import { useDebounce } from "./useDebounce";

interface Product {
  title: string;
  name: string;
  _id: string;
  description: string;
  mainImage: {
    secure_url: string;
  };
  slug: string;
  price: number;
}

const ProductsList: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Number.MAX_VALUE);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchProducts = () => {
    fetch(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10`)
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data.products
          .map((product: Product) => ({
            title: product.name,
            description: product.description,
            link: `/products/${product._id}`,
            image: product.mainImage.secure_url,
            price: product.price,
          }))
          .filter((product: Product) => {
            return product.title
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase());
          })
          .filter((product: Product) => {
            return product.price >= minPrice && product.price <= maxPrice;
          });

        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearchQuery, minPrice, maxPrice]);

  if (loading) {
    return (
      <section className="container mx-auto px-5 lg:px-10 mt-10">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {[...Array(10)].map((_, index) => (
            <SkeltonCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-8">
      <div className="flex justify-center gap-6 items-center">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        <PriceRangeInputs
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
        />
      </div>
      <HoverEffect items={products} />
    </section>
  );
};

export default ProductsList;
