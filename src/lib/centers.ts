export type CenterProps = {
  id: number;
  company: string;
  name: string;
  images: string[];
  rating: number;
  reviews: number;
  category: string;
  address: string;
  logo: string;
  description: string;
};

export const centers: CenterProps[] = [
  {
    id: 5,
    company: "bloom_skin",
    name: "Bloom Skin & Beauty",
    rating: 4.9,
    reviews: 91,
    category: "Skin",
    address: "654 Avenida El Polo, Surco, Lima",
    logo: "/images/center5_logo.png",
    images: [
      "/images/center5_1.png",
      "/images/center5_2.png",
      "/images/center5_3.png",
      "/images/center5_4.png",
    ],
    description:
      "Bloom Skin & Beauty is a skin care and beauty salon that offers a range of services including facials, peels, and waxing.",
  },
  {
    id: 2,
    company: "glow_nails",
    name: "Glow Nails Studio",
    rating: 4.9,
    reviews: 88,
    category: "Nails",
    address: "456 Avenida Primavera, San Borja, Lima",
    logo: "/images/center2_logo.png",
    images: [
      "/images/center2_1.png",
      "/images/center2_2.png",
      "/images/center2_3.png",
      "/images/center2_4.png",
    ],
    description:
      "Glow Nails Studio is a nail care and beauty salon that offers a range of services including manicures, pedicures, and waxing.",
  },
  {
    id: 3,
    company: "zen_massage",
    name: "Zen Massage & Spa",
    rating: 4.8,
    reviews: 102,
    category: "Massage",
    address: "789 Calle Los Sauces, Miraflores, Lima",
    logo: "/images/center3_logo.png",
    images: [
      "/images/center3_1.png",
      "/images/center3_2.png",
      "/images/center3_3.png",
      "/images/center3_4.png",
      "/images/center3_5.png",
    ],
    description:
      "Zen Massage & Spa is a massage and spa salon that offers a range of services including massages, facials, and waxing.",
  },
  {
    id: 4,
    company: "urban_cut",
    name: "Urban Cut Studio",
    rating: 4.7,
    reviews: 67,
    category: "Barber",
    address: "321 Jirón de la Unión, Centro de Lima",
    logo: "/images/center4_logo.png",
    images: [
      "/images/center4_1.png",
      "/images/center4_2.png",
      "/images/center4_3.png",
    ],
    description:
      "Urban Cut Studio is a barber shop that offers a range of services including haircuts, shaves, and waxing.",
  },
  {
    id: 1,
    company: "beard_barber",
    name: "Beard & Barber",
    rating: 4.6,
    reviews: 120,
    category: "Barber",
    address: "123 Main Street, Downtown, Lima",
    logo: "/images/center1_logo.png",
    images: [
      "/images/center1_1.png",
      "/images/center1_2.png",
      "/images/center1_3.png",
      "/images/center1_4.png",
      "/images/center1_5.png",
    ],
    description:
      "Beard & Barber is a barber shop that offers a range of services including haircuts, shaves, and waxing.",
  },
];
