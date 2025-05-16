import { useEffect, useState, useMemo } from "react";
import { fetchDateTimes } from "@/app/api/fetchDateTimes";
import { MONTHS } from "@/lib/constants";
type TimeSlot = {
  time: string;
  available: boolean;
};

const parseDateString = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-");
  return { year: Number(year), month: Number(MONTHS[month]), day: Number(day) };
};

const isToday = (dateStr: string) => {
  const today = new Date();
  const { year, month, day } = parseDateString(dateStr);
  return (
    today.getFullYear() === year &&
    today.getMonth() + 1 === month &&
    today.getDate() === day
  );
};

export function useAvailableTimes(date: string) {
  const [times, setTimes] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchDateTimes(date)
      .then((data) => setTimes(data as TimeSlot[]))
      .catch(() => setTimes([]))
      .finally(() => setIsLoading(false));
  }, [date]);

  const availableTimes = useMemo(() => {
    return times.filter(({ time, available }) => {
      if (!available) return false;
      if (!isToday(date)) return true;

      const now = new Date();
      const [hour, minute] = time.split(":").map(Number);
      const slotTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hour,
        minute,
        0,
        0
      );
      return slotTime > now;
    });
  }, [times, date]);

  return { availableTimes, isLoading };
}
