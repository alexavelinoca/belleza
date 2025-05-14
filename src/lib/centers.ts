export type CenterProps = {
  id: number;
  company: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  services: ServiceProps[];
};

export type ServiceProps = {
  id: number;
  name: string;
  price: number;
  time: number;
};

export const centers: CenterProps[] = [
  {
    id: 1,
    company: "beard_barber",
    name: "Beard & Barber",
    image: "/images/center.png",
    rating: 4.2,
    reviews: 100,
    category: "Barber",
    services: [
      {
        id: 1,
        name: "Service 1",
        price: 100,
        time: 30,
      },
      {
        id: 2,
        name: "Service 2",
        price: 100,
        time: 30,
      },
      {
        id: 3,
        name: "Service 3",
        price: 100,
        time: 30,
      },
      {
        id: 4,
        name: "Service 4",
        price: 100,
        time: 30,
      },
      {
        id: 5,
        name: "Service 5",
        price: 100,
        time: 30,
      },
    ],
  },
  {
    id: 2,
    company: "Hair_Barber",
    name: "Hair & Barber",
    image: "/images/center2.png",
    rating: 4.7,
    reviews: 43,
    category: "Hair",
    services: [
      {
        id: 1,
        name: "Service 1",
        price: 100,
        time: 30,
      },
    ],
  },
  {
    id: 3,
    company: "Nails_Barber",
    name: "Nails & Barber",
    image: "/images/center3.png",
    rating: 4.9,
    reviews: 100,
    category: "Nails",
    services: [
      {
        id: 1,
        name: "Service 1",
        price: 100,
        time: 30,
      },
    ],
  },
  {
    id: 4,
    company: "Massage_Hair",
    name: "Massage & Hair",
    image: "/images/center4.png",
    rating: 4.9,
    reviews: 100,
    category: "Massage",
    services: [
      {
        id: 1,
        name: "Service 1",
        price: 100,
        time: 30,
      },
    ],
  },
  {
    id: 5,
    company: "Massage_Barber",
    name: "Massage & Barber",
    image: "/images/center5.png",
    rating: 4.8,
    reviews: 133,
    category: "Massage",
    services: [
      {
        id: 1,
        name: "Service 1",
        price: 100,
        time: 30,
      },
      {
        id: 2,
        name: "Service 2",
        price: 100,
        time: 30,
      },
    ],
  },
];
