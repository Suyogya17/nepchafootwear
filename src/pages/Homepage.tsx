import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Service';
import Products from '../components/Products';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Products />
      <Contact />
    </div>
  );
}