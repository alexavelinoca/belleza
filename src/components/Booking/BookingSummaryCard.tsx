"use client";

import { CenterProps } from "@/lib/centers";
import { ServiceProps } from "@/lib/services";
import { StarIcon, CalendarIcon, ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  center: CenterProps;
  services: ServiceProps[];
  continueHref?: string;
  onContinue?: () => void;
  date?: string;
  time?: string;
  duration?: number;
};

export default function BookingSummaryCard({
  center,
  services,
  continueHref,
  onContinue,
  date,
  time,
  duration,
}: Props) {
  const router = useRouter();

  const total = services.reduce((acc, s) => acc + s.price, 0);

  const addTime = (time: string, duration: number) => {
    const [hours, minutes] = time.split(":").map(Number);
    const start = new Date();
    start.setHours(hours, minutes, 0, 0);

    const end = new Date(start);
    end.setMinutes(start.getMinutes() + duration);

    const format = (d: Date) =>
      d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

    return `${format(start)} - ${format(end)}`;
  };

  const parseDuration = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours} h ${minutes} m duration`;
  };

  const handleDisabled = () => {
    if (services.length === 0) return true;
    if (date && !time) {
      console.log(date, time);
      return true;
    }
    return false;
  };
  const pathname = usePathname();
  const title = pathname.includes("time") ? "Select time" : "Select services";
  const handleContinue = () => {
    if (title === "Select services") {
      router.push(`/${center.company}/booking/time`);
    } else {
      const formRef = document.querySelector("form");
      formRef?.requestSubmit();
    }
  };

  return (
    <div className='sticky top-20 border border-gray-200 rounded-md w-[550px] flex flex-col justify-between max-h-[600px] p-6 hidden lg:flex'>
      <div className='flex flex-col'>
        {/* Info */}
        <div className='flex flex-row gap-4'>
          <div className='relative h-[100px] w-[100px]'>
            <Image
              src={center.images[0] || "/images/default-image.png"}
              alt={center.name}
              fill
              className='object-cover rounded-md'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-lg font-bold font-montserrat'>{center.name}</p>
            <div className='flex flex-row gap-2'>
              <p className='text-sm font-montserrat'>{center.rating}</p>
              <StarIcon className='w-4 h-4' fill='black' />
              <p className='text-sm font-montserrat'>({center.reviews})</p>
            </div>
            <p className='text-sm font-montserrat'>{center.address}</p>
          </div>
        </div>

        {/* Date and time */}
        {(date || time) && (
          <div className='flex flex-col gap-2 py-4'>
            {date && (
              <p className='flex flex-row gap-2 text-sm font-medium text-gray-500'>
                <CalendarIcon className='w-5 h-5' />
                {date}
              </p>
            )}
            {time && duration && (
              <p className='flex flex-row gap-2 text-sm font-medium text-gray-500'>
                <ClockIcon className='w-5 h-5' />
                {addTime(time, duration)} ({parseDuration(duration)})
              </p>
            )}
          </div>
        )}

        {/* Services list */}
        <div className='flex flex-col gap-4 mt-4 font-montserrat'>
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} className='flex flex-col'>
                <div className='flex flex-row gap-2 w-full justify-between'>
                  <p className='text-sm font-medium'>{service.name}</p>
                  <p className='text-sm font-medium'>${service.price}</p>
                </div>
                <p className='text-sm font-medium'>{service.time} min</p>
              </div>
            ))
          ) : (
            <p className='text-sm text-gray-500'>No services selected</p>
          )}
        </div>

        <hr className='my-4' />

        {/* Total */}
        <div className='flex flex-row gap-2 w-full justify-between'>
          <p className='text-sm font-bold'>Total</p>
          <p className='text-sm font-bold'>${total}</p>
        </div>
      </div>

      {/* Continue button */}
      <div className='flex gap-2'>
        <Button
          className='w-full mt-4 self-end'
          onClick={handleContinue}
          disabled={handleDisabled()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
