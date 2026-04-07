import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Service';
import Products from '../components/Products';
import Contact from '../components/Contact';
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import ProductDetail from './ProductDetailPage';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Products />
      <Contact />
      <FloatingWhatsApp phoneNumber={'9828885834'} accountName={'Nepcha International Industry'} avatar={'/shoesimg/nepcha.png'} onSubmit={()=>{console.log("Message Sent ")}} />
    </div>
  );
}