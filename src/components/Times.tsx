"use client";
import { useState, useEffect } from "react";
import { fetchDateTimes } from "@/app/api/fetchDateTimes";
import useUserSelectionsStore from "@/store/userSelectionsStore";
import { Skeleton } from "@/components/ui/skeleton";
export function Times({ date }: { date: string }) {
  const [times, setTimes] = useState<{ time: string; available: boolean }[]>(
    []
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { setTime } = useUserSelectionsStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDateTimes(date).then((times) => {
      setTimes(times as { time: string; available: boolean }[]);
      setIsLoading(false);
    });
  }, [date]);

  const handleClick = (time: string) => {
    setSelectedTime(time);
    setTime(time);
  };

  const isToday = (selectedDate: string) => {
    const today = new Date();
    const [year, day] = selectedDate.split("-");

    return (
      today.getFullYear() === Number(year) &&
      today.getMonth() === new Date(`${selectedDate}`).getMonth() &&
      today.getDate() === Number(day)
    );
  };

  const now = new Date();

  const availableTimes = times.filter(({ time, available }) => {
    if (!available) return false;
    if (!isToday(date)) return true;

    const [hour, minute] = time.split(":").map(Number);
    const slotTime = new Date();
    slotTime.setHours(hour, minute, 0, 0);

    return slotTime > now;
  });

  if (isLoading) {
    return (
      <div className='mb-5 gap-5'>
        <Skeleton className='w-full h-15 mb-2' />
        <Skeleton className='w-full h-15 mb-2' />
        <Skeleton className='w-full h-15 mb-2' />
        <Skeleton className='w-full h-15 mb-2' />
        <Skeleton className='w-full h-15 mb-2' />
        <Skeleton className='w-full h-15 mb-2' />
      </div>
    );
  }

  return (
    <div className='mb-5'>
      {availableTimes.length > 0 ? (
        availableTimes.map((timeAvailable) => {
          const isSelected = selectedTime === timeAvailable.time;
          return (
            <div
              key={timeAvailable.time}
              className={`rounded-md p-4 w-full cursor-pointer mb-2 ${
                isSelected
                  ? "border-2 border-[#6950f3]"
                  : "border border-gray-200"
              }`}
              onClick={() => handleClick(timeAvailable.time)}
            >
              {timeAvailable.time}
            </div>
          );
        })
      ) : (
        <div className='text-center text-gray-600 border border-gray-200 rounded-md p-4 w-full cursor-pointer mb-2'>
          No times available
        </div>
      )}
    </div>
  );
}
