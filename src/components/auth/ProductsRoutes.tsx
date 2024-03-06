import { FC, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProductsRoutesProps {
  userToken: string | null | undefined;
  children: ReactNode;
}

const ProductsRoutes: FC<ProductsRoutesProps> = ({
  userToken,
  children,
}: ProductsRoutesProps) => {
  const [firstAttempt, setFirstAttempt] = useState(true);
  const isLoggedIn = userToken !== null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && firstAttempt) {
      navigate("/sign-in");

      setFirstAttempt(false);
    }
  }, [isLoggedIn, firstAttempt, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};

export default ProductsRoutes;
