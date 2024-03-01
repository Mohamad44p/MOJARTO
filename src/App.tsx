import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bottombar from "./components/shared/Bottombar";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import AuthProvider from "./context/AuthProvider";
import SignUpForm from "./components/auth/Sign-up";
import Home from "./pages/Home";
import SignInForm from "./components/auth/Sign-in";
import Products from "./pages/Products";
import ContactPage from "./pages/ContactPage";
import PaymentPage from "./pages/PaymentPage";
import { Toaster } from "./components/ui/sonner";
import CartProvider from "./components/cart/Providers";
function App() {
  return (
    <AuthProvider>
      <Router>
        <>
          <Navbar />
          <CartProvider>
            {" "}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/add-payment-card" element={<PaymentPage />} />
              <Route path="/sign-up" element={<SignUpForm />} />
              <Route path="/sign-in" element={<SignInForm />} />
            </Routes>
            <Toaster />
          </CartProvider>
          <Bottombar />
          <Footer />
        </>
      </Router>
    </AuthProvider>
  );
}

export default App;
