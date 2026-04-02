import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navigation />

      {/* Page content */}
      <main className="flex-1">
        <Outlet /> {/* This renders the matched page */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}