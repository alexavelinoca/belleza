import { ServiceProps } from "@/lib/services";
import { Button } from "./ui/button";
import { PlusIcon, CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import useUserSelectionsStore from "@/store/userSelectionsStore";

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
  const addService = useUserSelectionsStore((state: any) => state.addService);
  const services = useUserSelectionsStore((state: any) => state.services);
  const selected = services.some((s: ServiceProps) => s.id === service.id);

  const handleBooking = () => {
    addService(service);
  };

  const goToBooking = () => {
    router.push(`/${company}/booking`);
  };

  return (
    <div className='flex flex-row gap-2 min-h-[100px] border border-gray-200 rounded-md p-4'>
      <div className='flex flex-col justify-between w-full pl-1'>
        <h2 className='text-lg font-bold font-montserrat'>{service.name}</h2>
        <p className='text-sm text-gray-500 font-montserrat'>
          {service.time} min
        </p>
        <p className='text-sm font-medium font-montserrat pt-2'>
          $ {service.price}
        </p>
      </div>
      <Button
        variant='outline'
        className={`px-4 py-2 ${!booking && "rounded-2xl"} self-center ${
          selected ? "bg-[#6950f3]" : ""
        }`}
        onClick={booking ? handleBooking : goToBooking}
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
