"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  CalendarIcon,
  StarIcon,
  ClockIcon,
  CheckIcon,
  MapPin,
} from "lucide-react";

import { fetchCenters } from "@/app/api/fetchCenters";
import useUserSelectionsStore from "@/store/userSelectionsStore";
import { Button } from "@/components/ui/button";
import { CenterProps } from "@/lib/centers";

export default function AppointmentConfirmationPage() {
  const { center } = useParams();
  const router = useRouter();
  const { resetServices, resetDate, resetTime } = useUserSelectionsStore();

  const date = useUserSelectionsStore((state) => state.date);
  const time = useUserSelectionsStore((state) => state.time);
  const [centerContent, setCenterContent] = useState<CenterProps | undefined>();

  const cleanUserSelections = () => {
    router.push("/");
    resetServices();
  };

  useEffect(() => {
    fetchCenters().then((data) => {
      const found = data.find((c) => c.company === center);
      setCenterContent(found);
    });
  }, [center]);

  if (!centerContent) return <p className='text-center py-20'>Loading...</p>;

  return (
    <div className='min-h-screen bg-white px-6 py-10 lg:px-24 flex flex-col items-center'>
      <p className='text-3xl md:text-4xl font-montserrat font-bold text-center mb-10'>
        Appointment Details
      </p>
      <div className='w-full max-w-6xl bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden flex flex-col lg:flex-row'>
        <div className='relative w-full lg:w-1/2 h-[300px] lg:h-auto'>
          <Image
            src={centerContent.images[0] || "/images/default-image.png"}
            alt={centerContent.name}
            fill
            className='object-cover'
            priority
          />
        </div>
        <div className='w-full lg:w-1/2 p-8 flex flex-col justify-between gap-3 md:gap-6'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-3'>
              <h1 className='text-3xl font-bold font-montserrat'>
                {centerContent.name}
              </h1>
              <div className='flex items-center gap-1 text-sm text-black'>
                <StarIcon size={20} fill='currentColor' />
                {centerContent.rating.toFixed(1)}
              </div>
            </div>

            <p className='text-gray-500 text-md font-montserrat flex flex-row items-center gap-2'>
              <MapPin size={20} /> {centerContent.address}
            </p>

            <div className='flex items-center gap-2 text-green-600 bg-green-100 px-3 py-1 rounded-full w-fit mt-4'>
              <CheckIcon size={16} />
              <span className='text-sm font-semibold'>
                Appointment Confirmed
              </span>
            </div>
          </div>

          <div className='flex flex-col gap-3 mt-4 text-lg font-montserrat'>
            <div className='flex items-center gap-2'>
              <CalendarIcon size={20} className='text-[#6950f3]' />
              <span>{date}</span>
            </div>
            <div className='flex items-center gap-2'>
              <ClockIcon size={20} className='text-[#6950f3]' />
              <span>{time}</span>
            </div>
          </div>

          <div className='flex justify-between items-center mt-6'>
            <Button className='w-full' onClick={cleanUserSelections}>
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
