import { CenterProps } from "@/lib/centers";
import { StarIcon } from "lucide-react";

export default function CenterDetails({
  centerContent,
}: {
  centerContent: CenterProps;
}) {
  return (
    <>
      <p className='text-sm md:text-lg font-montserrat font-regular text-gray-600'>
        {centerContent?.description}
      </p>
      <p className='text-lg font-semibold flex items-center gap-2'>
        {centerContent?.rating}
        <StarIcon size={20} className='text-black' fill='currentColor' />
        <span className='text-lg text-purple-500'>
          ( {centerContent?.reviews || 0} )
        </span>
      </p>
    </>
  );
}
