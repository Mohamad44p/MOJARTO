import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PaymentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mt-8 mb-16">Your Cart</h1>

      <div className="w-full flex flex-col gap-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col w-full md:w-1/2 gap-5">
            <Label>First Name</Label>
            <Input placeholder="example" />
          </div>
          <div className="flex flex-col w-full md:w-1/2 gap-5">
            <Label>Last Name</Label>
            <Input placeholder="example" />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Label>Email address *</Label>
          <Input placeholder="@example.com" />
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col w-full md:w-1/2 gap-5">
            <Label>TELEGRAM CONTACT ( TELEGRAM CONTACT )</Label>
            <Input placeholder="example" />
          </div>
          <div className="flex flex-col w-full md:w-1/2 gap-5">
            <Label>ICQ CONTACT ( OPTIONAL )</Label>
            <Input placeholder="example" />
          </div>
        </div>
        <div className="w-full border-2 border-[#C8C9CB]"></div>
        <div className="flex flex-col gap-5">
          <Label>Where did you hear About Us?</Label>
          <Textarea placeholder="example" />
        </div>
      </div>
    </div>
  );
}
