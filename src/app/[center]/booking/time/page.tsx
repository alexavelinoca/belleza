"use client";
import { CenterProps } from "@/lib/centers";
import { centers } from "@/lib/centers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { StarIcon } from "lucide-react";
import { ServiceProps } from "@/lib/services";
import useUserSelectionsStore from "@/store/userSelectionsStore";
import { Button } from "@/components/ui/button";
import Calendar from "@/components/Calendar";
const schema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
});

type AppointmentForm = z.infer<typeof schema>;

export default function Appointment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentForm>({
    resolver: zodResolver(schema),
  });

  const [currentCenter, setCurrentCenter] = useState<CenterProps | undefined>();
  const { center } = useParams();
  const services = useUserSelectionsStore((state: any) => state.services);

  useEffect(() => {
    const centerData = centers.find((c) => c.company === center);
    setCurrentCenter(centerData);
  }, [center]);

  const onSubmit = (data: AppointmentForm) => {
    console.log("Agendado ✅", data);
    // Aquí puedes llamar a reserveSlot() y guardar en localStorage o Zustand
  };
  return (
    <div className='flex flex-col gap-4 max-w-screen-xl mx-auto p-6 lg:p-10'>
      <h1 className='text-3xl font-bold font-montserrat mb-6'>Select time</h1>
      <div className='flex flex-row gap-4'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6 w-full mr-12'
        >
          <div className='flex flex-row gap-4'>
            <div className='w-full'>
              <label className='block text-sm font-medium'>First name</label>
              <input
                type='text'
                {...register("firstname")}
                className='w-full border p-2 rounded'
              />
              {errors.firstname && (
                <p className='text-red-500 text-sm'>
                  {errors.firstname.message}
                </p>
              )}
            </div>
            <div className='w-full'>
              <label className='block text-sm font-medium'>Last name</label>
              <input
                type='text'
                {...register("lastname")}
                className='w-full border p-2 rounded'
              />
              {errors.lastname && (
                <p className='text-red-500 text-sm'>
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium'>Email</label>
            <input
              type='email'
              {...register("email")}
              className='w-full border p-2 rounded'
            />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email.message}</p>
            )}
          </div>

          <Calendar />

          <button
            type='submit'
            className='bg-black text-white px-6 py-2 rounded font-semibold'
          >
            Confirm
          </button>
        </form>
        <div className='border border-gray-200 rounded-md p-4 w-[550px] flex flex-col justify-between max-h-[600px] p-6'>
          <div className='flex flex-col'>
            <div className='flex flex-row gap-4'>
              <div className='relative h-[100px] w-[100px]'>
                <Image
                  src={currentCenter?.images[0] || "/images/default-image.png"}
                  alt={currentCenter?.name || ""}
                  fill
                  className='object-cover rounded-md'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-lg font-bold font-montserrat'>
                  {currentCenter?.name}
                </p>
                <div className='flex flex-row gap-2'>
                  <p className='text-sm font-montserrat'>
                    {currentCenter?.rating}
                  </p>
                  <StarIcon className='w-4 h-4' fill='black' />
                  <p className='text-sm font-montserrat'>
                    ({currentCenter?.reviews})
                  </p>
                </div>
                <p className='text-sm font-montserrat'>
                  {currentCenter?.address}
                </p>
              </div>
            </div>
            <div className='flex flex-col gap-4 mt-4 font-montserrat'>
              {services.length > 0 ? (
                services.map((service: ServiceProps) => (
                  <div key={service.id} className='flex flex-col'>
                    <div className='flex flex-row gap-2 w-full justify-between'>
                      <p className='text-sm font-medium font-montserrat'>
                        {service.name}
                      </p>
                      <p className='text-sm font-medium font-montserrat'>
                        ${service.price}
                      </p>
                    </div>
                    <p className='text-sm font-medium font-montserrat'>
                      {service.time} min
                    </p>
                  </div>
                ))
              ) : (
                <p className='text-sm font-montserrat text-gray-500'>
                  No services selected
                </p>
              )}
            </div>
            <hr className='my-4' />
            <div className='flex flex-row gap-2 w-full justify-between'>
              <p className='text-sm font-montserrat font-bold'>Total</p>
              <p className='text-sm font-montserrat font-bold'>
                $
                {services.reduce((acc: number, service: ServiceProps) => {
                  return acc + service.price;
                }, 0)}
              </p>
            </div>
          </div>
          <div className='flex gap-2'>
            <Button className='w-full mt-4 self-end'>Continue</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
