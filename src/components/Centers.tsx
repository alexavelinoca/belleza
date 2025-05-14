import { centers } from "@/lib/centers";
import Center from "./Center";

export default function Centers() {
  return (
    <div className='flex flex-wrap gap-6'>
      {centers.map((center) => {
        return <Center key={center.id} {...center} />;
      })}
    </div>
  );
}
