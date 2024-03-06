import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_KEY as string);

export default function PaymentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mt-8 mb-16">Your Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col w-full md:w-1/2 gap-5">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" type="text" placeholder="Enter your first name" />
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" type="text" placeholder="Enter your last name" />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Label htmlFor="email">Email address *</Label>
            <Input id="email" type="email" placeholder="Enter your email address" />
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col w-full md:w-1/2 gap-5">
              <Label htmlFor="telegramContact">TELEGRAM CONTACT</Label>
              <Input id="telegramContact" type="text" placeholder="Enter your Telegram contact" />
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-5">
              <Label htmlFor="icqContact">ICQ CONTACT (OPTIONAL)</Label>
              <Input id="icqContact" type="text" placeholder="Enter your ICQ contact" />
            </div>
          </div>
          <div className="w-full border-2 border-[#C8C9CB]"></div>
          <div className="flex flex-col gap-5">
            <Label htmlFor="whereHeard">Where did you hear About Us?</Label>
            <Textarea id="whereHeard" placeholder="Enter where you heard about us" />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Label>Payment Information</Label>
          <div className="border border-gray-300 rounded-lg p-4">
            <Elements stripe={stripePromise}>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
}
