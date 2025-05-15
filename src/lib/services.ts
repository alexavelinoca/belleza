export type ServiceProps = {
  id: number;
  centerId: number;
  name: string;
  price: number;
  time: number;
};

export const services: ServiceProps[] = [
  { id: 101, centerId: 1, name: "Classic Beard Trim", price: 50, time: 30 },
  { id: 102, centerId: 1, name: "Modern Haircut", price: 80, time: 45 },
  {
    id: 103,
    centerId: 1,
    name: "Full Barber Experience",
    price: 120,
    time: 60,
  },
  { id: 104, centerId: 1, name: "Hot Towel Shave", price: 40, time: 20 },
  { id: 105, centerId: 1, name: "Hair Wash & Style", price: 60, time: 25 },

  { id: 201, centerId: 2, name: "Manicure Express", price: 40, time: 25 },
  { id: 202, centerId: 2, name: "Full Nail Design", price: 90, time: 60 },
  { id: 203, centerId: 2, name: "Spa Pedicure", price: 70, time: 50 },
  { id: 204, centerId: 2, name: "Acrylic Set", price: 100, time: 90 },

  { id: 301, centerId: 3, name: "Relaxation Massage", price: 100, time: 60 },
  { id: 302, centerId: 3, name: "Deep Tissue Therapy", price: 130, time: 75 },
  { id: 303, centerId: 3, name: "Back & Neck Relief", price: 85, time: 45 },
  { id: 304, centerId: 3, name: "Foot Reflexology", price: 70, time: 30 },

  { id: 401, centerId: 4, name: "Urban Shave", price: 45, time: 25 },
  { id: 402, centerId: 4, name: "Style Refresh", price: 75, time: 40 },
  { id: 403, centerId: 4, name: "Haircut + Wash", price: 85, time: 50 },

  { id: 501, centerId: 5, name: "Facial Glow", price: 95, time: 60 },
  { id: 502, centerId: 5, name: "Skin Detox", price: 110, time: 70 },
  { id: 503, centerId: 5, name: "Anti-aging Treatment", price: 140, time: 80 },
];
