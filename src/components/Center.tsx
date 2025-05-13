import { CenterProps } from "@/lib/centers";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Center(center: CenterProps) {
  const { name, image, rating, reviews, category } = center;
  return (
    <div className='max-w-[350px] gap-2 bg-white rounded-md shadow-lg cursor-pointer'>
      <Link href={`/${center.company}`}>
        <Image
          src={image}
          className='rounded-t-md w-full h-[200px] object-cover'
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
