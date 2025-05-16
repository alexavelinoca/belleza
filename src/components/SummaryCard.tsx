import { ClockIcon, StarIcon } from "lucide-react";

import { MapPinIcon } from "lucide-react";
import { Button } from "./ui/button";
import { CenterProps } from "@/lib/centers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SummaryCard({
  centerContent,
}: {
  centerContent: CenterProps | undefined;
}) {
  const router = useRouter();

  useEffect(() => {
    if (centerContent?.company)
      router.prefetch(`/${centerContent.company}/booking`);
  }, [centerContent?.company, router]);

  if (!centerContent) return null;

  const { name, rating, reviews, company, address } = centerContent;

  return (
    <div className='flex flex-col gap-2 shadow-lg border border-gray-200 p-6 rounded-md h-[280px] min-w-[400px] hidden lg:flex'>
      <h2 className='text-3xl font-bold font-montserrat'>{name}</h2>
      <p className='text-lg font-semibold flex items-center gap-2'>
        {rating}
        <StarIcon size={20} className='text-black' fill='currentColor' />
        <span className='text-lg text-purple-500'>( {reviews} )</span>
      </p>
      <Button
        variant='default'
        className='px-4 py-2 rounded-md'
        onClick={() => router.push(`/${company}/booking`)}
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
          <p className='text-sm text-gray-700 font-montserrat'>{address}</p>
        </div>
      </div>
    </div>
  );
}
