'use client'
import Link from "next/link";
import { getServerSession } from "next-auth";
import {useState} from 'react'
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

 function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between mx-0 p-4">
        <Link href={session ? '/dashboard' : '/'} className="flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dbvlq1k1b/image/upload/v1696345177/logo_Doctor_Finder.png"
            className="h-12 mr-3 ml-3 mb-3"
            alt="Doctor Finder Logo"
          />
          <span className=" text-2xl font-semibold whitespace-nowrap dark:text-white">
            DoctorFinder
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
          onClick={handleMenuToggle}
        >
          <span className="sr-only">Abrir menu princiapal</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:w-auto w-full`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {session ? (
              <>
              <li>
                <Link
                  href="/dashboard/profile"
                  className={` ${pathname === '/dashboard/profile' ? 
                  ' text-black dark:text-white' : 'block py-2 pl-3 pr-4 text-black hover:text-blue-500  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-white'
                }  `}
                  aria-current="page"
                >
                  Perfil
                </Link>
              </li>
               <li>
               <Link
                 href="/find-doctor"
                 className={` ${pathname === '/dashboard/profile' ? 
                 ' text-black dark:text-white' : 'block py-2 pl-3 pr-4 text-black hover:text-blue-500  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-white'
               }  `}
                 aria-current="page"
               >
                 Buscar doctor
               </Link>
             </li>
             </>
            ) : (
              <>
                <li>
                  <Link
                    href="/about"
                    className="flex justify-between py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    About
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-1 w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="flex justify-between py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Login
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-1 w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="flex justify-between block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Register
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-1 w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                        />
                      </svg>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex justify-between py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Contact
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-1 w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                    </div>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>

    // <nav className="bg-zin-900 p-4">
    //   <div className="flex justify-between mx-auto">
    //     <div className="flex gap-3 items-center">
    //       <Link href="/">
    //         <Image
    //           src="https://res.cloudinary.com/dbvlq1k1b/image/upload/v1696345177/logo_Doctor_Finder.png"
    //           alt="logo"
    //           width={70}
    //           height={60}
    //         />
    //         <h1 className="font-bold text-xl "> Doctor Finder </h1>
    //       </Link>
    //     </div>
    //     <ul className="flex gap-x-2">
    //       {session ? (
    //         <li className="px-3 py-1  hover:text-blue-400">
    //           <Link href="/dashboard/profile">Perfil</Link>
    //         </li>
    //       ) : (
    //         <>
    //           <li className="px-3 py-1  hover:text-blue-400">
    //             <Link href="/login">Login</Link>
    //           </li>
    //           <li className="px-3 py-1  hover:text-blue-400">
    //             <Link href="/register">Registrar</Link>
    //           </li>
    //           <li className="px-3 py-1 hover:text-blue-400">
    //             <Link href="/about">Sobre nosotros</Link>
    //           </li>
    //         </>
    //       )}
    //     </ul>
    //   </div>
    // </nav>
  );
}

export default Navbar;
