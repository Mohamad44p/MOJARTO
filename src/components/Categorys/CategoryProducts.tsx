import { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import NoItem from "./NoItem";
import Loading from "./loading";
import { HoverEffect } from "@/components/ui/card-hover-effect";

interface Product {
  _id: string;
  name: string;
  mainImage: {
    secure_url: string;
  };
  price: number;
}

const CategoryProducts = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [categoryName, setCategoryName] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const categoryResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/categories/${categoryId}`
        );
        if (categoryResponse.ok) {
          const categoryData = await categoryResponse.json();
          setCategoryName(categoryData.name);
        } else {
          console.error("Failed to fetch category details");
        }

        const productsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/products/category/${categoryId}`
        );
        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          setProducts(productsData.products);
        } else {
          console.error("Failed to fetch products for the category");
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    fetchCategoryProducts();
  }, [categoryId]);

  return (
    <section className="container mb-52 mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        The Products in {categoryName}
      </h2>

      <Suspense fallback={<Loading />}>
        {products.length === 0 ? (
          <NoItem />
        ) : (
          <div className="max-w-5xl mx-auto px-8">
            <HoverEffect
              items={products.map((product) => ({
                title: product.name,
                description: `$${product.price}`,
                link: `/products/${product._id}`,
                image: product.mainImage.secure_url,
              }))}
            />
          </div>
        )}
      </Suspense>
    </section>
  );
};

export default CategoryProducts;
