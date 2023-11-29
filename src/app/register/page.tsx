"use client";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { Toaster, toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { InputRightElement, Input, Button, InputGroup } from "@chakra-ui/react";

function RegisterPage() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<File>();
  const [error, setError] = useState();
  const router = useRouter();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const lastname = formData.get("lastname");
    const confirmPassword = formData.get("confirmPassword");
    const foto = formData.get("foto");

    if (email) {
      formData.append("email", email);
    }

    if (password) {
      formData.append("password", password);
    }

    if (name) {
      formData.append("name", name);
    }

    if (lastname) {
      formData.append("lastname", lastname);
    }

    if (confirmPassword) {
      formData.append("confirmPassword", confirmPassword);
    }

    if (foto) {
      formData.append("foto", foto);
    }

    try {
      const signupResponse = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData
      );
      toast.success("Usuario creado con exito");
      console.log(signupResponse);

      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: password,
      });

      if (res?.ok) {
        return router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  };

  const toastSet = () => {
    toast.error(error);
  };

  return (
    <div>
      {error && toastSet()}
      <section className="bg-gray-50 dark:bg-gray-900 container">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-3/4 lg:py-0">
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
                Crear Una Cuenta
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Ingresa tu nombre"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Ingresa tu apellido"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tu correo electrónico
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
                  <InputGroup>
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="••••••••"
                      name="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />

                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Ocultar" : "Mostrar"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirmar Contraseña
                  </label>
                  <InputGroup>
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="••••••••"
                      name="confirmPassword"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />

                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Ocultar" : "Mostrar"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </div>
                <div className="flex items-center space-x-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Foto de perfil
                  </label>
                  <div>
                    <input
                      className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100"
                      type="file"
                      name="foto"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setImagePreviewUrl(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                  <div>
                    {imagePreviewUrl && (
                      <img
                        src={URL.createObjectURL(imagePreviewUrl)}
                        alt=""
                        className="h-13 w-20 rounded-full"
                      />
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Crear cuenta
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Ya tienes una cuenta?
                  <Link
                    href="/login"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Login aqui
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

export default RegisterPage;
