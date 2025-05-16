import { CenterProps } from "@/lib/centers";
import { DEFAULT_IMAGE } from "@/lib/constants";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Center(center: CenterProps) {
  const { name, images, rating, reviews, category } = center;
  return (
    <div className='w-full sm:w-[48%] md:w-[31%] lg:w-[23%] min-w-[200px] bg-white rounded-md shadow-lg cursor-pointer transition-all'>
      <Link href={`/${center.company}`}>
        <Image
          src={images[0] || DEFAULT_IMAGE}
          className='w-full aspect-[4/3] object-cover rounded-t-md'
          alt='center'
          width={270}
          height={150}
        />
        <div className='flex flex-col gap-2 p-4'>
          <h3 className='text-lg font-montserrat font-medium'>{name}</h3>
          <div className='flex items-center gap-2'>
            <p className='text-sm text-gray-500 flex items-center gap-1'>
              {rating}{" "}
              <StarIcon
                size={16}
                className='text-black-500'
                fill='currentColor'
              />{" "}
              ({reviews} reviews)
            </p>
          </div>
          <p className='text-sm text-gray-500 border rounded-lg w-fit px-2 font-montserrat font-regular'>
            {category}
          </p>
        </div>
      </Link>
    </div>
  );
}
