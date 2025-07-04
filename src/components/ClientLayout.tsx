"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Login" },
  { href: "/", label: "Register" },
  { href: "/", label: "Contact" },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNav = pathname?.includes("/booking");

  return (
    <>
      {!hideNav && (
        <header>
          <nav className='fixed top-0 left-0 w-full z-50 bg-white shadow-md'>
            <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
              <Link href='/'>
                <Image
                  src='/images/belleza-logo.png'
                  alt='Belleza'
                  width={100}
                  height={100}
                  priority
                />
              </Link>
              <div className='flex items-center gap-8'>
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className='font-bold font-montserrat'
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </header>
      )}
      <main className='mt-17'>{children}</main>
    </>
  );
}
