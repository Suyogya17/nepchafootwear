import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./hooks/Layout"; // ✅ Your Layout component
import Home from "./pages/Homepage";
import AllProducts from "./pages/AllProductspage";
import ProductDetail from "./pages/ProductDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap all pages with your Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/all" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* Add more pages here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}