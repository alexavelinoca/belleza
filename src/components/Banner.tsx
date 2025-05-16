export default function Banner() {
  return (
    <header className='bg-red-200 h-[20vh] sm:h-[30vh] md:h-[30vh] lg:h-[40vh] mb-12 shadow-md'>
      <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 h-full flex'>
        <h1 className='self-center font-bold font-playfair max-w-3xl lg:max-w-4xl md:max-w-5xl md:text-6xl text-3xl sm:text-4xl'>
          Your beauty appointment, just a click away
        </h1>
      </div>
    </header>
  );
}
