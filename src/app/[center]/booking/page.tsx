"use client";
import Services from "@/components/Services";
import { centers } from "@/lib/centers";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function BookingPage() {
  const center = centers[0];
  const { services, name, rating, reviews, company, image } = center;

  return (
    <div className='flex flex-row gap-4 max-w-screen-xl mx-auto p-6 lg:p-10'>
      <div className='mr-4 w-full'>
        <Services
          services={services}
          centerName={name}
          rating={rating}
          reviews={reviews}
          company={company}
          booking
        />
      </div>
      <div className='border border-gray-200 rounded-md p-4 w-[600px] bg-yellow-200'>
        <div className='flex flex-row gap-4'>
          <div className='relative h-[100px] w-[100px]'>
            <Image
              src={image}
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
        <div className='flex flex-row gap-2 mt-4 text-gray-500 font-montserrat'>
          No services selected
        </div>
        <hr className='my-4' />
        <div className='flex flex-row gap-2'>
          <p className='text-sm font-montserrat font-bold'>Total</p>
          <p className='text-sm font-montserrat font-bold'>$0</p>
        </div>
        <div className='flex gap-2 bg-green-200 '>
          <Button className='w-full mt-4 self-end'>Continue</Button>
        </div>
      </div>
    </div>
  );
}
