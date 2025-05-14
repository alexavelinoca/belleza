import Centers from "@/components/Centers";

export default function Home() {
  return (
    <>
      <div className='bg-red-200 h-[40vh] mb-12'>
        <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
          <h1 className='text-6xl pt-30 font-bold font-playfair max-w-3xl'>
            Your beauty appointment, just a click away
          </h1>
        </div>
      </div>
      <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
        <Centers />
      </div>
    </>
  );
}
