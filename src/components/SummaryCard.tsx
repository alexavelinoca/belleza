import { ClockIcon, StarIcon } from "lucide-react";

import { MapPinIcon } from "lucide-react";
import { Button } from "./ui/button";
import { CenterProps } from "@/lib/centers";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

export default function SummaryCard({
  centerContent,
  router,
}: {
  centerContent: CenterProps;
  router: Router;
}) {
  return (
    <div className='flex flex-col gap-2 shadow-lg border border-gray-200 p-8 rounded-md h-[280px] min-w-[400px] hidden lg:flex'>
      <h2 className='text-3xl font-bold font-montserrat'>
        {centerContent?.name}
      </h2>
      <p className='text-lg font-semibold flex items-center gap-2'>
        {centerContent?.rating}
        <StarIcon size={20} className='text-black' fill='currentColor' />
        <span className='text-lg text-purple-500'>
          ( {centerContent?.reviews} )
        </span>
      </p>
      <Button
        variant='default'
        className='px-4 py-2 rounded-md'
        onClick={() => router.push(`/${centerContent?.company}/booking`)}
      >
        Book Now
      </Button>
      <hr className='border-t border-gray-200 my-3' />
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row gap-2'>
          <ClockIcon size={20} className='text-black' />
          <p className='text-sm text-gray-700 font-montserrat'>
            Closed - opens on Wednesday at 09:00
          </p>
        </div>
        <div className='flex flex-row gap-2'>
          <MapPinIcon size={20} className='text-black' />
          <p className='text-sm text-gray-700 font-montserrat'>
            Sesame Street 123, New York, NY 10001
          </p>
        </div>
      </div>
    </div>
  );
}
