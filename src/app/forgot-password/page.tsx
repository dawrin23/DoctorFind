"use client";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Toaster, toast } from "sonner";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handledResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await axios.post(
        "http://localhost:3000/api/auth/forgot-password",
        {
          email: email,
        }
      );

      if (data.status === 200) {
        toast.success("Revisa tu correo electronico");
        
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (

    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 dark:bg-gray-900">
      <h1 className="text-4xl font-medium dark:text-white">Restablecer Contraseña</h1>
      <p className="text-slate-500 dark:text-white">Llene el formulario para restablecer la contraseña</p>

      <form className="my-10" onSubmit={handledResetPassword}>
        <div className="flex flex-col space-y-5 ">
          <label htmlFor="email">
            <p className="font-medium text-slate-700 pb-2 dark:text-white">Correo</p>
            <input 
              id="email" 
              name="email" 
              type="email" 
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" 
              placeholder="Tu correo electronico"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </label>

          <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
            <span>Restablecer Contraseña</span>
          </button>
          <p className="text-center">No estas registrado todavia? <a href="#" className="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Register now </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg></span></a></p>
        </div>
      </form>
    </div>

    // <div>
    //   <section className="bg-gray-50 dark:bg-gray-900 container">
    //     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    //       <a
    //         href="#"
    //         className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    //       >
    //         <img
    //           className="w-20 h-15 mr-2 mb-2 ml-5"
    //           src="https://res.cloudinary.com/dbvlq1k1b/image/upload/v1696345177/logo_Doctor_Finder.png"
    //           alt="logo"
    //         />
    //         DoctorFinder
    //       </a>
    //       <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    //         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
    //           <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    //             Restablecer Contraseña
    //           </h1>
    //           <form
    //             className="space-y-4 md:space-y-6"
    //             onSubmit={handledResetPassword}
    //           >
    //             <div>
    //               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    //                 Correo
    //               </label>
    //               <input
    //                 type="email"
    //                 onChange={(event) => {
    //                   setEmail(event.target.value);
    //                 }}
    //                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //                 placeholder="Tu correo electronico"
    //               />
    //             </div>
    //             <button
    //               type="submit"
    //               className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    //             >
    //               Enviar codigo
    //             </button>
    //             <p className="text-sm font-light text-gray-500 dark:text-gray-400">
    //               Quieres acceder a tu cuenta?
    //               <Link
    //                 href="/login"
    //                 className="font-medium text-primary-600 hover:underline dark:text-primary-500"
    //               >
    //                 Acceder aqui
    //               </Link>
    //             </p>
    //             <Toaster richColors />
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
  );
}

export default ForgotPassword;
