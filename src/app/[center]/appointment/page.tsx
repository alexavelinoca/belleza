"use client";
import { fetchCenters } from "@/app/api/fetchCenters";
import { Button } from "@/components/ui/button";
import { CenterProps } from "@/lib/centers";
import useUserSelectionsStore from "@/store/userSelectionsStore";
import { CalendarIcon, StarIcon, CheckIcon } from "lucide-react";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Appointment() {
  const date = useUserSelectionsStore((state: any) => state.date);
  const time = useUserSelectionsStore((state: any) => state.time);
  const router = useRouter();
  const { center } = useParams();
  const [centerContent, setCenterContent] = useState<CenterProps | undefined>();

  useEffect(() => {
    fetchCenters().then((data) => {
      console.log("data", data);
      setCenterContent(
        data.find((centerName) => centerName.company === center)
      );
    });
  }, [center]);

  return (
    <div className='flex flex-col gap-4 max-w-screen-sm mx-auto lg:p-6 border border-gray-200 rounded-md bg-red-200'>
      <h1 className='text-4xl font-bold mb-2'>Appointment Confirmation</h1>
      <Image
        src={centerContent?.images[0] || "/images/default-image.png"}
        alt={centerContent?.name || ""}
        width={1000}
        height={1000}
      />
      <div className='flex flex-row items-center gap-2'>
        <h1 className='text-3xl font-bold'>{centerContent?.name}</h1>
        <StarIcon size={20} className='text-black' fill='currentColor' />
        <div className='text-sm text-white bg-[#6950f3] font-montserrat font-semibold py-2 rounded-xl px-2 flex flex-row items-center gap-2'>
          <CheckIcon size={20} className='text-white' />
          Confirmed
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>Details:</h2>
        <p className='text-lg flex flex-row items-center gap-2'>
          <CalendarIcon size={20} className='text-black' /> {date}
        </p>
        <p className='text-lg flex flex-row items-center gap-2'>
          <ClockIcon size={20} className='text-black' /> {time}
        </p>
        <Button onClick={() => router.push("/")}>Go Home</Button>
      </div>
    </div>
  );
}
