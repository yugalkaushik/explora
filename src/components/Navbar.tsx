import Link from "next/link";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/solid";
import Image from "next/image";
import logo from "../assets/images/logo.svg";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between pt-1 pr-32 pb-2 pl-32 bg-transparent">
      <div className="flex flex-row space-x-1 items-center justify-center">
        <Link href="/" passHref>
          <Image
            src={logo}
            width={0}
            height={40}
            alt="Logo"
            priority
            className="cursor-pointer h-auto"
          />
        </Link>
        <Link
          href="/"
          className="flex patua-one text-blue-500 cursor-pointer font-bold text-xl hover:text-red-500"
        >
          explora
        </Link>
      </div>

      <ul className="hidden md:flex space-x-5">
        <li className="hover:underline hover:underline-offset-4 hover:decoration-blue-500">
          <Link href="/destination">Destination</Link>
        </li>
        <li>
            <p className="text-blue-500">•</p>
        </li>
        <li className="hover:underline hover:underline-offset-4 hover:decoration-blue-500">
          <Link href="/bookings">Bookings</Link>
        </li>
        <li>
            <p className="text-blue-500">•</p>
        </li>
        <li className="hover:underline hover:underline-offset-4 hover:decoration-blue-500">
          <Link href="/activities">Activities</Link>
        </li>
        {/* <li>
                    <Link href="/search" className="flex items-center">
                        <MagnifyingGlassIcon className="w-4 h-6 text-black" aria-hidden="true" />
                    </Link>
                </li> */}
      </ul>

      <div className="hidden md:flex space-x-4">
        <Link
          href="/login"
          className="bg-white text-sm text-black pt-1 pb-1 pr-3 pl-3 rounded-md hover:text-blue-500"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="bg-black text-sm text-white pt-1 pb-1 pr-3 pl-3 rounded-md hover:bg-blue-500"
        >
          Sign up
        </Link>
      </div>

      <div className="md:hidden flex items-center">
        {/* <button className="ml-4 focus:outline-none">
                    <MagnifyingGlassIcon className="w-6 h-6 text-black" aria-hidden="true" />
                </button> */}
        <button onClick={toggleMenu} className="ml-4 focus:outline-none">
          <Bars3Icon className="w-6 h-6 text-black" aria-hidden="true" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white p-2 z-10">
          <ul className="flex flex-col items-center text-center space-y-4">
            <li>
              <Link href="/destination">Destination</Link>
            </li>
            <li>
              <Link href="/bookings">Bookings</Link>
            </li>
            <li>
              <Link href="/activities">Activities</Link>
            </li>
            <li>
              <Link href="/login" className="text-black">
                Log in
              </Link>
            </li>
            <li>
              <Link href="/signup" className="text-black">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
