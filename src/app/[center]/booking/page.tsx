"use client";
import Services from "@/components/Services";
import { centers } from "@/lib/centers";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useUserSelectionsStore from "@/store/userSelectionsStore";
import { ServiceProps } from "@/lib/services";
export default function BookingPage() {
  const center = centers[0];
  const { name, rating, reviews, company, images } = center;
  const services = useUserSelectionsStore((state: any) => state.services);
  return (
    <div className='flex flex-row gap-4 max-w-screen-xl mx-auto p-6 lg:p-10'>
      <div className='mr-4 w-full'>
        <Services centerId={center.id} company={company} booking={true} />
      </div>
      <div className='border border-gray-200 rounded-md p-4 w-[600px] flex flex-col justify-between max-h-[600px] p-6'>
        <div className='flex flex-col'>
          <div className='flex flex-row gap-4'>
            <div className='relative h-[100px] w-[100px]'>
              <Image
                src={images[0]}
                alt={name}
                fill
                className='object-cover rounded-md'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-lg font-bold font-montserrat'>{name}</p>
              <div className='flex flex-row gap-2'>
                <p className='text-sm font-montserrat'>{rating}</p>
                <StarIcon className='w-4 h-4' fill='black' />
                <p className='text-sm font-montserrat'>({reviews})</p>
              </div>
              <p className='text-sm font-montserrat'>
                13555 Biscayne Blvd, North Miami Beach
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-4 mt-4 font-montserrat'>
            {services.length > 0 ? (
              services.map((service: ServiceProps) => (
                <div key={service.id} className='flex flex-col'>
                  <div className='flex flex-row gap-2 w-full justify-between'>
                    <p className='text-sm font-medium font-montserrat'>
                      {service.name}
                    </p>
                    <p className='text-sm font-medium font-montserrat'>
                      ${service.price}
                    </p>
                  </div>
                  <p className='text-sm font-medium font-montserrat'>
                    {service.time} min
                  </p>
                </div>
              ))
            ) : (
              <p className='text-sm font-montserrat text-gray-500'>
                No services selected
              </p>
            )}
          </div>
          <hr className='my-4' />
          <div className='flex flex-row gap-2 w-full justify-between'>
            <p className='text-sm font-montserrat font-bold'>Total</p>
            <p className='text-sm font-montserrat font-bold'>
              $
              {services.reduce((acc: number, service: ServiceProps) => {
                return acc + service.price;
              }, 0)}
            </p>
          </div>
        </div>
        <div className='flex gap-2'>
          <Button className='w-full mt-4 self-end'>Continue</Button>
        </div>
      </div>
    </div>
  );
}
