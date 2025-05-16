"use client";
import { ServiceProps } from "@/lib/services";
import { useEffect } from "react";
import { Service } from "./Service";
import { useState } from "react";
import { fetchCenterServices } from "@/app/api/fetchCenterServices";
import { Skeleton } from "@/components/ui/skeleton";
export default function Services({
  company,
  booking,
  centerId,
}: {
  company: string;
  booking: boolean;
  centerId: number;
}) {
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCenterServices(centerId).then((data) => {
      setServices(data);
      setIsLoading(false);
    });
  }, [centerId]);

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
      {booking ? (
        <h1 className='text-2xl md:text-3xl font-bold font-montserrat'>
          Select services
        </h1>
      ) : (
        <h1 className='text-2xl md:text-3xl font-bold font-montserrat'>
          Services
        </h1>
      )}
      <div className='flex flex-row gap-4'>
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
    </div>
  );
}
