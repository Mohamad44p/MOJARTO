import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import AuthProvider from "./context/AuthProvider";
import CartProvider from "./components/cart/Providers";
import Bottombar from "./components/shared/Bottombar";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Loader from "./components/shared/Loader";
import CategoryProducts from "./components/Categorys/CategoryProducts";
import { useAuth } from "./context/AuthContext";
import ProductsRoutes from "./components/auth/ProductsRoutes";
import { ProductPage } from "./components/Products/ProductPage";
import { NotFoundPage } from "./components/shared/NotFoundPage";
import ShoppingCartModal from "./components/cart/ShoppingCartModal";
import Checkout from "./components/cart/checkout";
import CheckoutCart from "./components/cart/CheckoutCart";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import UserProfile from "./components/auth/UserProfile";
import SuccessPage from "./components/cart/SuccessPage";

const SignUpForm = React.lazy(() => import("./components/auth/SignUpForm"));
const Home = React.lazy(() => import("./pages/Home"));
const SignInForm = React.lazy(() => import("./components/auth/SignInForm"));
const Products = React.lazy(() => import("./pages/Products"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const PaymentPage = React.lazy(() => import("./pages/PaymentPage"));

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_KEY);

function App() {
  const { user } = useAuth();
  const [userToken, setUserToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem("userToken");
    setUserToken(token);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <>
            <Navbar user={user} userToken={userToken} />
            <React.Suspense fallback={<Loader />}>
              <ShoppingCartModal
                user={user}
                userToken={userToken}
                name={""}
                description={""}
                mainImage={{
                  secure_url: "",
                }}
                price={0}
                categoryName={""}
              />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route
                  path="/products/:_id"
                  element={
                    <ProductPage
                      name=""
                      description=""
                      mainImage={{ secure_url: "" }}
                      price={0}
                      categoryName=""
                      user={user}
                      userToken={userToken}
                    />
                  }
                />
                <Route path="/contact" element={<ContactPage />} />
                <Route
                  path="/add-payment-card"
                  element={
                    <ProductsRoutes userToken={userToken}>
                      <Elements stripe={stripePromise}>
                        <PaymentPage />
                      </Elements>
                    </ProductsRoutes>
                  }
                />{" "}
                <Route
                  path="/products/category/:categoryId"
                  element={<CategoryProducts />}
                />
                <Route path="/sign-up" element={<SignUpForm />} />
                <Route path="/sign-in" element={<SignInForm user={user} />} />
                <Route path="/profile" element={<UserProfile userToken={userToken}  />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/checkout/:_id" element={<Checkout />} />
                <Route path="/checkout" element={<CheckoutCart />} />
                <Route path="/SuccessPage" element={<SuccessPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <Toaster />
              <Bottombar />
              <Footer />
            </React.Suspense>
          </>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
