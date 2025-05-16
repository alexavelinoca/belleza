"use client";

import { Service } from "./Service";
import { Skeleton } from "@/components/ui/skeleton";
import { useCenterServices } from "@/hooks/useCenterServices";
export default function Services({
  company,
  booking,
  centerId,
}: {
  company: string;
  booking: boolean;
  centerId: number;
}) {
  const { services, isLoading } = useCenterServices(centerId);

  if (isLoading) {
    return (
      <div className={`flex flex-col gap-4 w-full`}>
        <Skeleton className='w-full h-10' />
        <Skeleton className='w-full h-10' />
        <Skeleton className='w-full h-10' />
      </div>
    );
  }
  return (
    <div className={`flex flex-col gap-4 w-full`}>
      <h1 className='text-2xl md:text-3xl font-bold font-montserrat'>
        {booking ? "Select services" : "Services"}
      </h1>
      <div className='flex flex-col gap-4 w-full lg:mr-4 pb-18 lg:pb-0'>
        {services.length > 0 ? (
          services.map((service) => (
            <Service
              key={service.id}
              service={service}
              company={company}
              booking={booking}
            />
          ))
        ) : (
          <p className='text-center text-gray-500'>
            No services found for this center
          </p>
        )}
      </div>
    </div>
  );
}
