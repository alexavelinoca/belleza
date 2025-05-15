import { DELAY } from "@/lib/constants";
import { times } from "@/lib/times";
import { TimesData } from "./bookDateTimes";

export async function fetchDateTimes(date: string) {
  const stored = localStorage.getItem("times");
  const timesData: TimesData = stored ? JSON.parse(stored) : times;
  localStorage.setItem("times", JSON.stringify(timesData));

  // Garantiza que el día exista
  if (!timesData[date]) {
    timesData[date] = [];
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(timesData[date]);
    }, 500); // simula delay de API
  });
}
