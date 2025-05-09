"use client";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import Loading from "./loading";
import axios from "axios";

function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();
  const loading1 = status === "loading";
  const [id, setId] = useState("");

  useEffect(() => {
    setId(session?.user?.id)
  }, [session]);

  useEffect(() => {
    if (!loading && session) {
      router.push("/dashboard/profile");
    }
  }, [loading1, session]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });
      console.log(res);
      if (res?.ok) {
        const response = await fetch('http://localhost:3000/api/auth/find-user/'+id.toString(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json();
        
        if (data?.user?.MedicalSpecialty) {
          return router.push("/doctor-solicitud");
        }
        return router.push("/dashboard");
      }
      if (res?.error) {
        toast.error("Error al iniciar sesion verifique sus credenciales");
      }
    } 
    catch (error) {
      toast.error("Error al iniciar sesion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-100">
      {error ? <>{toastSet()}</> : null}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <div className="w-15 h-12 mb-3">

            <img
              className="mr-2 w-full h-full object-cover"
              src="https://res.cloudinary.com/dbvlq1k1b/image/upload/v1696345177/logo_Doctor_Finder.png"
              alt="logo"
              ></img>
              </div>
            DoctorFinders
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Iniciar sesión
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tu correo
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full dark:text-white bg-blue-600 hover:text-lg hover:shadow-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  disabled={loading}
                >
                  {loading ? <Loading /> : "Iniciar sesion"}
                </button>
               <div className="flex justify-between">

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿No tienes una cuenta?
                  </p>
                  <Link
                    href="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                    Registrate aqui
                  </Link>
                </p>
                <Link
                  href="/forgot-password"
                  className="font-medium text-gray-600 hover:underline dark:text-blue-500"
                >
                  Olvide mi contraseña
                </Link>
                <Toaster richColors />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
