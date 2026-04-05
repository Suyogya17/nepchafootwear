export type Product = {
  id: number;
  name: string;
  category: string;
  image: string;
  size: string;
  description: string;
  //  images: {
  //   [color: string]: string; // maps color to image path
  // };
};

const products: Product[] = [
  {
    id: 1,
    name: "Runner Pro",
    category: "Sports",
    image: "/shoesimg/casual.jpg",
    size: "36-40",
    description: "Lightweight running shoe designed for comfort and durability.",
    // images: {
    //   red: "/images/shoes-red.jpg",
    //   white: "/images/shoes-white.jpg",
    //   blue: "/images/shoes-blue.jpg",
    //   green: "/images/shoes-green.jpg",
    // },
  },
  {
    id: 2,
    name: "Urban Walk",
    category: "Casual",
    image: "/shoesimg/sneaker.jpg",
    size: "36-40",
    description: "Perfect everyday wear with a modern and stylish look.",
    // images: {
    //   red: "/images/shoes-red.jpg",
    //   white: "/images/shoes-white.jpg",
    //   blue: "/images/shoes-blue.jpg",
    //   green: "/images/shoes-green.jpg",
    // },
    
  },
  {
    id: 3,
    name: "Classic Leather",
    category: "Formal",
    image: "/shoesimg/formal.jpg",
    size: "36-40",
    description: "Premium leather shoe for formal occasions.",
    // images: {
    //   red: "/images/shoes-red.jpg",
    //   white: "/images/shoes-white.jpg",
    //   blue: "/images/shoes-blue.jpg",
    //   green: "/images/shoes-green.jpg",
    // },
  },
  {
    id: 4,
    name: "Runner Pro",
    category: "Sports",
    size: "36-40",
    image: "https://i.pinimg.com/1200x/1a/71/3e/1a713eb78bb75491db3920e45c455945.jpg",
    description: "Lightweight running shoe designed for comfort and durability.",
    // images: {
    //   red: "/images/shoes-red.jpg",
    //   white: "/images/shoes-white.jpg",
    //   blue: "/images/shoes-blue.jpg",
    //   green: "/images/shoes-green.jpg",
    // },
  },
  {
    id: 5,
    name: "Urban Walk",
    category: "Casual",
    size: "36-40",
    image: "https://i.pinimg.com/736x/fc/78/fe/fc78fe142c62773cd935314608c3e6db.jpg",
    description: "Perfect everyday wear with a modern and stylish look.",
    // images: {
    //   red: "/images/shoes-red.jpg",
    //   white: "/images/shoes-white.jpg",
    //   blue: "/images/shoes-blue.jpg",
    //   green: "/images/shoes-green.jpg",
    // },
  },
  {
    id: 6,
    name: "Classic Leather",
    category: "Formal",
    size: "36-40",
    image: "https://i.pinimg.com/1200x/e3/33/9f/e3339f4868e1206f64224b44e0da6125.jpg",
    description: "Premium leather shoe for formal occasions.",
    // images: {
    //   red: "/images/shoes-red.jpg",
    //   white: "/images/shoes-white.jpg",
    //   blue: "/images/shoes-blue.jpg",
    //   green: "/images/shoes-green.jpg",
    // },
  },
];

export default products;