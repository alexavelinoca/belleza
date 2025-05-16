import { ServiceProps } from "@/lib/services";
import { Button } from "./ui/button";
import { PlusIcon, CheckIcon, ClockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import useUserSelectionsStore from "@/store/userSelectionsStore";
import { useEffect } from "react";

export function Service({
  service,
  company,
  booking,
}: {
  service: ServiceProps;
  company: string;
  booking: boolean;
}) {
  const router = useRouter();
  const addService = useUserSelectionsStore((state) => state.addService);
  const services = useUserSelectionsStore((state) => state.services);
  const selected = services.some((s: ServiceProps) => s.id === service.id);

  useEffect(() => {
    if (!booking) {
      router.prefetch(`/${company}/booking`);
    }
  }, [company, booking, router]);

  const handleBooking = () => {
    addService(service);
  };

  const handleNavigate = () => {
    addService(service);
    router.push(`/${company}/booking`);
  };

  const buttonClass = [
    "px-4 py-2 self-center",
    !booking && "rounded-2xl",
    booking && selected && "bg-[#6950f3] hover:bg-[#5e43f0] text-white",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`flex flex-row gap-2 min-h-[100px] border ${
        selected ? "border-[#6950f3]" : "border-gray-300"
      }  rounded-md p-4`}
    >
      <div className='flex flex-col justify-between w-full pl-1'>
        <h2 className='text-lg font-bold font-montserrat'>{service.name}</h2>
        <p className='text-sm text-gray-500 font-montserrat'>
          {service.description}
        </p>
        <p className='text-sm text-gray-500 font-montserrat flex items-center gap-2 mt-2'>
          <ClockIcon className='w-4 h-4' /> {service.time} min
        </p>
        <p className='text-sm font-medium font-montserrat pt-2'>
          $ {service.price}
        </p>
      </div>
      <Button
        variant='outline'
        className={buttonClass}
        onClick={booking ? handleBooking : handleNavigate}
      >
        {booking ? (
          selected ? (
            <CheckIcon className='w-4 h-4 text-white' />
          ) : (
            <PlusIcon className='w-4 h-4' />
          )
        ) : (
          "Book"
        )}
      </Button>
    </div>
  );
}
