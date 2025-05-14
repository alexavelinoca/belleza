import { ServiceProps } from "@/lib/centers";
import { Service } from "./Service";
import { Button } from "./ui/button";
import { ClockIcon, MapPinIcon, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Services({
  services,
  centerName,
  rating,
  reviews,
  company,
  booking,
}: {
  services: ServiceProps[];
  centerName: string;
  rating: number;
  reviews: number;
  company: string;
  booking: boolean;
}) {
  const router = useRouter();

  return (
    <div className='flex flex-col gap-4 mt-4 w-full'>
      <h1 className='text-2xl font-bold font-montserrat'>Services</h1>
      <div className='flex flex-row gap-4'>
        <div className='flex flex-col gap-4 w-full mr-4'>
          {services.map((service) => (
            <Service
              key={service.id}
              service={service}
              company={company}
              booking={booking}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
