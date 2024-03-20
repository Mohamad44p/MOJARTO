import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { CardDescription, CardTitle } from "../ui/card-hover-effect";

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export default function Order() {
  const [checkedOutProducts, setCheckedOutProducts] = useState<{
    [key: string]: Product;
  }>({});

  useEffect(() => {
    const storedProducts = localStorage.getItem("checkedOutProducts");
    if (storedProducts) {
      setCheckedOutProducts(JSON.parse(storedProducts));
    }
  }, []);

  return (
    <div className="flex flex-col gap-7 justify-center items-center my-24">
      <h1 className="text-3xl text-white font-mono font-bold mt-10">
        Your Orders
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-5">
        {Object.keys(checkedOutProducts).length > 0 ? (
          Object.values<Product>(checkedOutProducts).map((product: Product) => (
            <Card>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>
                  <p>Quantity: {product.quantity}</p>
                  <p>Price: ${product.price}</p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}
