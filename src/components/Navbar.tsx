'use client'
import Link from "next/link";
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
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href={session ? '/dashboard' : '/'} className="flex items-center">
          <img
            src="https://res.cloudinary.com/dbvlq1k1b/image/upload/v1696345177/logo_Doctor_Finder.png"
            className="h-10 mr-3"
            alt="Doctor Finder Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
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
            isMenuOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:w-auto w-full`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {session ? (
              <>
              <li>
                <Link
                  href="/dashboard/profile"
                  className={` ${pathname === '/dashboard/profile' ? 
                  ' text-black dark:text-white' : 'block py-2 pl-3 pr-4 text-black hover:text-blue-500  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500'
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
                 ' text-black dark:text-white' : 'block py-2 pl-3 pr-4 text-black hover:text-blue-500  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500'
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
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Iniciar Sesion
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Registrar
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Contactar
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
