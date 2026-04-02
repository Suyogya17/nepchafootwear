export type Dealer = {
  id: number;
  name: string;
  proprietor: string;
  address: string;
  contact: string;
  mapLink: string;
  logo: string;
  province: string;
};

const dealers: Dealer[] = [
  {
    id: 1,
    name: "Kathmandu Footwear Shop",
    proprietor: "Suman Shrestha",
    address: "New Road, Kathmandu, Nepal",
    contact: "+977 9801234567",
    mapLink: "https://maps.app.goo.gl/yAV3CCqr3ga4pyew5",
    logo: "https://i.pinimg.com/1200x/ce/c5/a3/cec5a30ae0ce8a8bfd1425ac9dae3dc0.jpg",
    province: "Bagmati"
  },
  {
    id: 2,
    name: "Pokhara Shoes Co.",
    proprietor: "Ramesh Thapa",
    address: "Lakeside, Pokhara, Nepal",
    contact: "+977 9812345678",
    mapLink: "https://maps.app.goo.gl/K29Go7s6KyiQBv7Z6",
    logo: "https://i.pinimg.com/736x/df/9d/32/df9d3239d33b6d50aecae7dd8ef324d5.jpg",
    province: "Gandaki"
  },
  { id: 3, 
    name: "Biratnagar Footwear", 
    proprietor: "Mina Rai", 
    address: "Biratnagar Main Street, Nepal",
    contact: "+977 9823456789", 
    mapLink: "https://maps.app.goo.gl/c9UybZcKVmxd2k999", 
    logo: "https://i.pinimg.com/736x/bc/9c/98/bc9c98c53d52cd2315dc134d666863ab.jpg", 
    province: "Province 1" 
    },
    // Add more dealers here...
];

export default dealers;