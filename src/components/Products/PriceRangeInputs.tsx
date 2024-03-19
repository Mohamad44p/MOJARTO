import React, { ChangeEvent } from "react";
import { Input } from "../ui/input";

interface PriceRangeInputsProps {
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
}

const PriceRangeInputs: React.FC<PriceRangeInputsProps> = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) => {
  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    onMinPriceChange(Number(e.target.value));
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    onMaxPriceChange(Number(e.target.value));
  };

  return (
    <div className="flex space-x-4">
      <Input
        type="number"
        placeholder="Min price"
        value={minPrice}
        onChange={handleMinPriceChange}
      />
      <Input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={handleMaxPriceChange}
      />
    </div>
  );
};

export default PriceRangeInputs;