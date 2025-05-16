import Image from "next/image";
import { CenterProps } from "@/lib/centers";
import { DEFAULT_IMAGE, DEFAULT_CENTER_NAME } from "@/lib/constants";
export default function CenterHeader({
  centerContent,
}: {
  centerContent: CenterProps;
}) {
  return (
    <>
      <div className='flex flex-row items-center gap-2'>
        <Image
          src={centerContent?.logo || DEFAULT_IMAGE}
          alt={centerContent?.name ?? DEFAULT_CENTER_NAME}
          width={100}
          height={100}
          className='rounded-md w-20 h-20 md:w-25 md:h-25 lg:w-30 lg:h-30'
        />
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>
          {centerContent?.name || DEFAULT_CENTER_NAME}
        </h1>
      </div>
    </>
  );
}
