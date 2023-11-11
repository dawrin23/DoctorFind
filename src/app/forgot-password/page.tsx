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
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 container">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-20 h-15 mr-2 mb-2 ml-5"
              src="https://res.cloudinary.com/dbvlq1k1b/image/upload/v1696345177/logo_Doctor_Finder.png"
              alt="logo"
            />
            DoctorFinder
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Restablecer Contraseña
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handledResetPassword}
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Correo
                  </label>
                  <input
                    type="email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Tu correo electronico"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Enviar codigo
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Quieres acceder a tu cuenta?
                  <Link
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Acceder aqui
                  </Link>
                </p>
                <Toaster richColors />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ForgotPassword;
