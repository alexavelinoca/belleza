import { CenterProps } from "@/lib/centers";
import { DEFAULT_IMAGE, DEFAULT_CENTER_NAME } from "@/lib/constants";
import Image from "next/image";

export default function CenterImages({
  centerContent,
}: {
  centerContent: CenterProps;
}) {
  return (
    <>
      <div className='flex flex-col md:flex-row gap-4 mb-4'>
        <div>
          <Image
            src={centerContent?.images[0] || DEFAULT_IMAGE}
            alt={centerContent?.name ?? DEFAULT_CENTER_NAME}
            width={1030}
            height={800}
            className='rounded-md aspect-[4/3] object-cover max-h-[300px] md:max-h-[515px]'
          />
        </div>
        <div className='flex flex-col gap-4 hidden lg:flex'>
          {[1, 2].map((i) => (
            <Image
              key={i}
              src={centerContent?.images[i] || DEFAULT_IMAGE}
              alt={centerContent?.name ?? DEFAULT_CENTER_NAME}
              width={500}
              height={200}
              className='rounded-md aspect-[4/3] object-cover max-h-[250px]'
            />
          ))}
        </div>
      </div>
    </>
  );
}
