import Centers from "@/components/Centers";

export default function Home() {
  return (
    <>
      <div className='pt-30 bg-red-200 h-[40vh] mb-12'>
        <div className='flex flex-col w-full pl-20 mb-20'>
          <h1 className='text-6xl font-bold font-playfair self-start max-w-3xl'>
            Your beauty appointment, just a click away
          </h1>
        </div>
      </div>
      <div className='flex flex-col w-full pl-20'>
        <Centers />
      </div>
    </>
  );
}
