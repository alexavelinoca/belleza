import { useState } from "react";
import useUserSelectionsStore from "@/store/userSelectionsStore";
import { Skeleton } from "@/components/ui/skeleton";
import { useAvailableTimes } from "@/hooks/useAvailableTimes";

export function Times({ date }: { date: string }) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const setTime = useUserSelectionsStore((state) => state.setTime);
  const { availableTimes, isLoading } = useAvailableTimes(date);

  const handleClick = (time: string) => {
    setSelectedTime(time);
    setTime(time);
  };

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
    <div className='mb-5 pb-0 md:pb-5'>
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
