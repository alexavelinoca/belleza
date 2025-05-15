import { SLOT_DURATION } from "@/lib/constants";

// types.ts
export type TimeSlot = {
  time: string;
  available: boolean;
};

export type TimesData = {
  [date: string]: TimeSlot[];
};

export function bookDateTimes(
  dateKey: string,
  selectedTime: string,
  timesData: TimesData,
  serviceDuration: number // en minutos
): TimesData {
  const newTimes = { ...timesData };

  const slots = newTimes[dateKey];
  if (!slots) return timesData;

  const startIndex = slots.findIndex((slot) => slot.time === selectedTime);
  if (startIndex === -1) return timesData;

  const slotsNeeded = Math.ceil(serviceDuration / SLOT_DURATION);

  const updatedSlots = [...slots];

  for (let i = 0; i < slotsNeeded; i++) {
    const index = startIndex + i;
    if (updatedSlots[index]) {
      updatedSlots[index] = { ...updatedSlots[index], available: false };
    }
  }

  newTimes[dateKey] = updatedSlots;
  localStorage.setItem("times", JSON.stringify(newTimes));

  return newTimes;
}
