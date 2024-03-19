import { Button } from "../ui/button";
import Success from "../../assets/Succesimg.png";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
    const naviage = useNavigate();
  const handleContinueShopping = () => {
    naviage("/products");
  };

  return (
    <main className="flex items-center justify-center flex-col gap-10 h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#43404026] p-10 ">
        <div className="flex justify-center">
          <img
            src={Success}
            alt="Success image"
            className="w-2/4"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="text-white font-medium my-5">
            Thank you for your purchase. Your payment has been successfully processed.
          </p>
          <div className="flex flex-col items-center justify-center">
            <Button
              onClick={handleContinueShopping}
              className="bg-gradient-to-r from-blue-500 to-blue-200 text-white font-bold py-2 px-4 rounded-full"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
