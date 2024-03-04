import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import AuthProvider from "./context/AuthProvider";
import CartProvider from "./components/cart/Providers";
import Bottombar from "./components/shared/Bottombar";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Loader from "./components/shared/Loader";
import CategoryProducts from "./components/Categorys/CategoryProducts";

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
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <>
            <Navbar />
            <Suspense fallback={<Loader/>}>
              <ShoppingCartModal />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/add-payment-card" element={<PaymentPage />} />
                <Route path="/products/category/:categoryId" element={<CategoryProducts />} />
                <Route path="/sign-up" element={<SignUpForm />} />
                <Route path="/sign-in" element={<SignInForm />} />
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