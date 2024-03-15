import { FC, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Toaster, toast } from "sonner";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SubmitHandler } from "react-hook-form";

interface Product {
  name: string;
  description: string;
  price: number;
  mainImage?: {
    secure_url: string;
  };
}

// Define Zod schema for form validation
const schema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  cardNumber: z.string().length(16),
  expiryDate: z.string().length(5),
  cvv: z.string().length(3),
});

interface FormData {
  name: string;
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const Checkout: FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const methods = useForm<FormData>();

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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Validate form data against the Zod schema
      schema.parse(data);
      // If validation succeeds, navigate to success page
      navigate("/success");
    } catch (error) {
      // If validation fails, display error messages using toast notifications
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-8 mt-10 mb-20">
      <Toaster />
      <div className="grid gap-8 md:grid-cols-2">
        {product && (
          <div className="flex flex-col gap-5">
            {product.mainImage && (
              <img
                src={product.mainImage.secure_url}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            )}
            <h2 className="text-2xl font-bold text-white lg:text-3xl">
              {product.name}
            </h2>
            <p className="text-xl font-bold text-white md:text-2xl">
              ${product.price}
            </p>
          </div>
        )}

        <div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <FormField
                control={methods.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234 5678 9012 3456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="btn-primary mt-5">
                Pay
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
