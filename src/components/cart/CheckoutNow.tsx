import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

interface CheckoutNowProps {
  name: string;
  description: string;
  price: number;
  currency: string;
  price_id: string;
}

const CheckoutNow: FC<CheckoutNowProps> = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <Button variant={'ghost'} onClick={handleCheckout}>Checkout Now</Button>
    </div>
  );
};

export default CheckoutNow;
