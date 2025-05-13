export type CenterProps = {
  id: number;
  company: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
};

export const centers: CenterProps[] = [
  {
    id: 1,
    company: "Beard_Barber",
    name: "Beard & Barber",
    image: "/images/center.png",
    rating: 4.2,
    reviews: 100,
    category: "Barber",
  },
  {
    id: 2,
    company: "Hair_Barber",
    name: "Hair & Barber",
    image: "/images/center2.png",
    rating: 4.7,
    reviews: 43,
    category: "Hair",
  },
  {
    id: 3,
    company: "Nails_Barber",
    name: "Nails & Barber",
    image: "/images/center3.png",
    rating: 4.9,
    reviews: 100,
    category: "Nails",
  },
  {
    id: 4,
    company: "Massage_Hair",
    name: "Massage & Hair",
    image: "/images/center4.png",
    rating: 4.9,
    reviews: 100,
    category: "Massage",
  },
  {
    id: 5,
    company: "Massage_Barber",
    name: "Massage & Barber",
    image: "/images/center5.png",
    rating: 4.8,
    reviews: 133,
    category: "Massage",
  },
];
