export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <nav className='sticky top-0 z-50 bg-white shadow-md'>
      <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Booking</h1>
      </div>
    </nav>
  );
}
