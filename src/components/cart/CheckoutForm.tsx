import React, { useState } from "react";
import { Label } from "../ui/label2";
import { Input } from "../ui/input2";
import { cn } from "../../lib/utils";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { object, string } from "zod";
import { Link, useNavigate } from "react-router-dom";

export function CheekoutForm() {
  const [cardState, setCardState] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
    email: "",
    firstname: "",
    lastname: "",
  });

  const cardSchema = object({
    cvc: string().min(3).max(3),
    expiry: string().min(5).max(5),
    name: string().min(5).max(15),
    number: string().min(13).max(13),
    email: string().email(),
    firstname: string().min(2),
    lastname: string().min(2),
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const validateCardData = () => {
    try {
      cardSchema.parse(cardState);
      return {};
    } catch (error: unknown) {
      const err = error as {
        formErrors: { fieldErrors: Record<string, string> };
      };
      return err.formErrors.fieldErrors;
    }
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setCardState({ ...cardState, [name]: value });
  };

  const handleInputFocus = (e: React.FormEvent<HTMLInputElement>) => {
    setCardState({ ...cardState, focus: e.currentTarget.name });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardErrors = validateCardData();
    if (Object.keys(cardErrors).length === 0) {
      navigate("/SuccessPage");
    } else {
      setErrors(cardErrors);
    }
  };

  return (
    <div className="max-w-md mt-24 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to MOJORTO Checkout
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Enter Your Payment Information to Complete Your Order
      </p>

      <form className="my-8" onSubmit={() => handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Mohammad"
              type="text"
              name="firstname"
              onChange={handleInputChange}
            />
            {errors["firstname"] && (
              <div className="text-red-500">{errors["firstname"]}</div>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Abu Omar"
              type="text"
              name="lastname"
              onChange={handleInputChange}
            />
            {errors["lastname"] && (
              <div className="text-red-500">{errors["lastname"]}</div>
            )}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            name="email"
            onChange={handleInputChange}
          />
          {errors["email"] && (
            <div className="text-red-500">{errors["email"]}</div>
          )}
        </LabelInputContainer>
        <div className="mb-4 mt-8">
          <div className="my-5">
            <Cards
              cvc={cardState.cvc}
              expiry={cardState.expiry}
              focused={cardState.focus as Focused | undefined}
              name={cardState.name}
              number={cardState.number}
            />
          </div>
          <Input
            type="text"
            name="name"
            placeholder="Cardholder Name"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          {errors["name"] && (
            <div className="text-red-500">{errors["name"]}</div>
          )}
          <Input
            type="number"
            name="number"
            placeholder="Card Number"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          {errors["number"] && (
            <div className="text-red-500">{errors["number"]}</div>
          )}
          <Input
            type="text"
            name="expiry"
            placeholder="Expiry Date"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          {errors["expiry"] && (
            <div className="text-red-500">{errors["expiry"]}</div>
          )}
          <Input
            type="number"
            name="cvc"
            placeholder="CVC"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          {errors["cvc"] && <div className="text-red-500">{errors["cvc"]}</div>}
        </div>
        {cardState.cvc &&
          cardState.expiry &&
          cardState.name &&
          cardState.number &&
          cardState.email &&
          cardState.firstname &&
          cardState.lastname && (
            <Link to="/SuccessPage">
              <button
                className="bg-gradient-to-br relative group/btn mt-10 from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Complete The Order
                <BottomGradient />
              </button>
            </Link>
          )}
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
