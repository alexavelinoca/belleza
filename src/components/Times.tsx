"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchDateTimes } from "@/app/api/fetchDateTimes";
import useUserSelectionsStore from "@/store/userSelectionsStore";
import { Skeleton } from "@/components/ui/skeleton";

type TimeSlot = {
  time: string;
  available: boolean;
};

export function Times({ date }: { date: string }) {
  const [times, setTimes] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const setTime = useUserSelectionsStore((state) => state.setTime);

  useEffect(() => {
    setSelectedTime(null);
    setIsLoading(true);
    fetchDateTimes(date)
      .then((data) => setTimes(data as TimeSlot[]))
      .catch(() => setTimes([]))
      .finally(() => setIsLoading(false));
  }, [date]);

  const handleClick = (time: string) => {
    setSelectedTime(time);
    setTime(time);
  };

  const isToday = (selectedDate: string): boolean => {
    const today = new Date();
    const [year, month, day] = selectedDate.split("-").map(Number);
    return (
      today.getFullYear() === year &&
      today.getMonth() + 1 === month &&
      today.getDate() === day
    );
  };

  const availableTimes = useMemo(() => {
    return times.filter(({ time, available }) => {
      if (!available) return false;
      if (!isToday(date)) return true;

      const now = new Date();
      const [hour, minute] = time.split(":").map(Number);
      const slotTime = new Date();
      slotTime.setHours(hour, minute, 0, 0);

      return slotTime > now;
    });
  }, [times, date]);

  if (isLoading) {
    return (
      <div className='mb-5 gap-5'>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className='w-full h-15 mb-2' />
        ))}
      </div>
    );
  }

  return (
    <div className='mb-5'>
      {availableTimes.length > 0 ? (
        availableTimes.map(({ time }) => {
          const isSelected = selectedTime === time;
          return (
            <div
              key={time}
              className={`rounded-md p-4 w-full cursor-pointer mb-2 ${
                isSelected
                  ? "border-2 border-[#6950f3]"
                  : "border border-gray-200"
              }`}
              onClick={() => handleClick(time)}
            >
              {time}
            </div>
          );
        })
      ) : (
        <div className='text-center text-gray-600 border border-gray-200 rounded-md p-4 w-full mb-2'>
          No times available
        </div>
      )}
    </div>
  );
}
