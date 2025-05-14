"use client";

import Services from "@/components/Services";
import { CenterProps, centers } from "@/lib/centers";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function CenterPage() {
  const { center } = useParams();
  const centerContent = centers.find((center2) => center2.company === center);
  console.log(centerContent);

  return (
    <div className=' flex flex-col gap-4 max-w-screen-xl mx-auto p-6 lg:p-10'>
      <h1 className='text-4xl font-bold'>{centerContent?.name}</h1>
      <p className='text-lg font-semibold flex items-center gap-2'>
        {centerContent?.rating}
        <StarIcon size={20} className='text-black' fill='currentColor' />
        <span className='text-lg text-purple-500'>
          ( {centerContent?.reviews} )
        </span>
      </p>
      <div className='flex flex-col md:flex-row gap-4 '>
        <div>
          <Image
            src={centerContent?.image || ""}
            alt={centerContent?.name || ""}
            width={1030}
            height={800}
            className='rounded-md'
          />
        </div>
        <div className='flex flex-col gap-4'>
          <Image
            src={centerContent?.image || ""}
            alt={centerContent?.name || ""}
            width={500}
            height={200}
            className='rounded-md'
          />
          <Image
            src={centerContent?.image || ""}
            alt={centerContent?.name || ""}
            width={500}
            height={200}
            className='rounded-md'
          />
        </div>
      </div>
      <Services
        services={centerContent?.services || []}
        centerName={centerContent?.name || ""}
        rating={centerContent?.rating || 0}
        reviews={centerContent?.reviews || 0}
        company={centerContent?.company || ""}
      />
    </div>
  );
}
