import { centers } from "@/lib/centers";
import Center from "./Center";

export default function Centers() {
  return (
    <div className='flex flex-row flex-wrap gap-12'>
      {centers.map((center) => {
        return <Center key={center.id} {...center} />;
      })}
    </div>
  );
}
