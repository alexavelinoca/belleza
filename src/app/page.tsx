import Banner from "@/components/Banner";
import Centers from "@/components/Center/Centers";

export default function Home() {
  return (
    <>
      <Banner />
      <section className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pb-10'>
        <Centers />
      </section>
    </>
  );
}
