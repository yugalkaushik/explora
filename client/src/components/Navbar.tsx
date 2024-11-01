import Link from "next/link";
import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/solid';
import Image from "next/image";
import logo from '../assets/images/logo.svg';
import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between pt-1 pr-32 pb-2 pl-32 bg-transparent">
            <div className="flex flex-col items-center justify-center text-sm">
    <Link href="/" passHref>
        <Image
            src={logo}
            width={0}
            height={40}
            alt="Logo"
            priority
            className="cursor-pointer h-auto mb-1"
        />
    </Link>
    <div className="flex">
        <span className="text-orange-500">Trip</span>
        <span className="text-black">Venture</span>
    </div>
</div>

            
            <ul className="hidden md:flex space-x-6">
                <li>
                    <Link href='/destination'>Destination</Link>
                </li>
                <li>
                    <Link href='/bookings'>Bookings</Link>
                </li>
                <li>
                    <Link href='/activities'>Activities</Link>
                </li>
                <li>
                    <Link href="/search" className="flex items-center">
                        <MagnifyingGlassIcon className="w-4 h-6 text-black" aria-hidden="true" />
                    </Link>
                </li>
            </ul>
            
            <div className="hidden md:flex space-x-4">
                <Link href='/login' className="bg-white text-sm text-black pt-1 pb-1 pr-3 pl-3 rounded-md">Log in</Link>
                <Link href='/signup' className="bg-black text-sm text-white pt-1 pb-1 pr-3 pl-3 rounded-md">Sign up</Link>
            </div>

            <div className="md:hidden flex items-center">
                <button className="ml-4 focus:outline-none">
                    <MagnifyingGlassIcon className="w-6 h-6 text-black" aria-hidden="true" />
                </button>
                <button onClick={toggleMenu} className="ml-4 focus:outline-none">
                    <Bars3Icon className="w-6 h-6 text-black" aria-hidden="true" />
                </button>
            </div>

            {isMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white p-2 z-10">
                        <ul className="flex flex-col items-center text-center space-y-4">
                            <li>
                                <Link href='/destination'>Destination</Link>
                            </li>
                            <li>
                                <Link href='/bookings'>Bookings</Link>
                            </li>
                            <li>
                                <Link href='/activities'>Activities</Link>
                            </li>
                            <li>
                                <Link href='/login' className="text-black">Log in</Link>
                            </li>
                            <li>
                                <Link href='/signup' className="text-black">Sign up</Link>
                            </li>
                        </ul>
                    </div>
            )}
        </nav>
    );
};

export default Navbar;
