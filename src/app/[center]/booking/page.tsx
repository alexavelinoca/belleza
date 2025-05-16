"use client";

import Services from "@/components/Services";
import { centers } from "@/lib/centers";
import useUserSelectionsStore from "@/store/userSelectionsStore";
import { CenterProps } from "@/lib/centers";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import BookingSummaryCard from "@/components/Booking/BookingSummaryCard";

export default function BookingPage() {
  const [currentCenter, setCurrentCenter] = useState<CenterProps | undefined>();
  const { center } = useParams();

  useEffect(() => {
    const centerData = centers.find((c) => c.company === center);
    setCurrentCenter(centerData);
  }, [center]);

  const services = useUserSelectionsStore((state) => state.services);
  const router = useRouter();

  const total = useMemo(
    () => services.reduce((acc, s) => acc + s.price, 0),
    [services]
  );

  if (!currentCenter) {
    return <p className='text-center mt-10'>Center not found</p>;
  }

  return (
    <div className='flex flex-row gap-4 max-w-screen-xl mx-auto p-6 lg:p-10'>
      <div className='mr-4 w-full'>
        <Services
          centerId={currentCenter.id}
          company={currentCenter.company}
          booking={true}
        />
      </div>
      <BookingSummaryCard
        center={currentCenter}
        services={services}
        continueHref={`/${currentCenter.company}/booking/time`}
      />
    </div>
  );
}
