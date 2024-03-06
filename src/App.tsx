import { useState, useEffect, Suspense, lazy } from "react";
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

const SignUpForm = lazy(() => import("./components/auth/SignUpForm"));
const Home = lazy(() => import("./pages/Home"));
const SignInForm = lazy(() => import("./components/auth/SignInForm"));
const Products = lazy(() => import("./pages/Products"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const ShoppingCartModal = lazy(
  () => import("./components/cart/ShoppingCartModal")
);

function App() {
  const { user } = useAuth();
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setUserToken(token);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <>
            <Navbar user={user} userToken={userToken} />
            <Suspense fallback={<Loader />}>
              <ShoppingCartModal />
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
                    />
                  }
                />
                <Route path="/contact" element={<ContactPage />} />
                <Route
                  path="/add-payment-card"
                  element={
                    <ProductsRoutes userToken={userToken}>
                      <PaymentPage />
                    </ProductsRoutes>
                  }
                />{" "}
                <Route
                  path="/products/category/:categoryId"
                  element={<CategoryProducts />}
                />
                <Route path="/sign-up" element={<SignUpForm />} />
                <Route path="/sign-in" element={<SignInForm user={user} />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <Toaster />
              <Bottombar />
              <Footer />
            </Suspense>
          </>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
