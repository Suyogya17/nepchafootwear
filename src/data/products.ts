export type Product = {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Runner Pro",
    category: "Sports",
    image: "public/shoesimg/casual.jpg",
    description: "Lightweight running shoe designed for comfort and durability.",
  },
  {
    id: 2,
    name: "Urban Walk",
    category: "Casual",
    image: "public/shoesimg/casual.jpg",
    description: "Perfect everyday wear with a modern and stylish look.",
  },
  {
    id: 3,
    name: "Classic Leather",
    category: "Formal",
    image: "public/shoesimg/formal.jpg",
    description: "Premium leather shoe for formal occasions.",
  },
  {
    id: 4,
    name: "Runner Pro",
    category: "Sports",
    image: "https://i.pinimg.com/1200x/1a/71/3e/1a713eb78bb75491db3920e45c455945.jpg",
    description: "Lightweight running shoe designed for comfort and durability.",
  },
  {
    id: 5,
    name: "Urban Walk",
    category: "Casual",
    image: "https://i.pinimg.com/736x/fc/78/fe/fc78fe142c62773cd935314608c3e6db.jpg",
    description: "Perfect everyday wear with a modern and stylish look.",
  },
  {
    id: 6,
    name: "Classic Leather",
    category: "Formal",
    image: "https://i.pinimg.com/1200x/e3/33/9f/e3339f4868e1206f64224b44e0da6125.jpg",
    description: "Premium leather shoe for formal occasions.",
  },
];

export default products;