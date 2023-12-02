import axios from "axios";
import React, { Fragment, useState } from "react";
import Modal from "react-modal";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { Transition, Dialog } from "@headlessui/react";
import { Button, InputGroup, InputRightElement, Input } from "@chakra-ui/react";

interface PasswordResetModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  id: number;
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  isOpen,
  onRequestClose,
  id,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async () => {
    // e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
    } else {
      const res = await axios.put(
        "http://localhost:3000/api/auth/reset-password/" + id,
        {
          password: password,
          confirmPassword: confirmPassword,
        }
      );
      if (res.status === 200) {
        toast.success("Contraseña cambiada correctamente");
        onRequestClose();
        router.push("/login");
      } else {
        toast.error(res.data.message);
      }
    }
  };

  return (
    <>
      <Toaster richColors />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onRequestClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 dark:bg-slate-800 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Cambiar Contrasena
                  </Dialog.Title>
                  <div className="mt-2">
                    <h4>Nueva contraseña</h4>
                    <InputGroup>
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="••••••••"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />

                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick} className="bg-blue-600 hover:bg-blue-900 rounded-md p-1 text-white mt-2">
                        {show ? "Ocultar" : "Mostrar"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  </div>

                  <div className="mt-2">
                    <h4>Confirmar contraseña</h4>
                    <InputGroup>
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="••••••••"
                      name="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />

                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick} className="bg-blue-600 hover:bg-blue-900 rounded-md p-1 text-white mt-2">
                        {show ? "Ocultar" : "Mostrar"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={onRequestClose}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ml-4 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-offset"
                    >
                      Cambiar contraseña
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>

    // <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
    //   <section className="bg-gray-50 dark:bg-gray-900">
    //     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    //       <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    //         Cambiar Contrasena
    //       </h2>
    //       <form
    //         className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
    //         onSubmit={handleSubmit}
    //       >
    //         <div>
    //           <label
    //             htmlFor="password"
    //             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //           >
    //             Nueva Contrasena
    //           </label>
    //           <input
    //             type="password"
    //             name="password"
    //             id="password"
    //             placeholder="••••••••"
    //             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //         </div>
    //         <div>
    //           <label
    //             htmlFor="confirm-password"
    //             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //           >
    //             Confirmar Contrasena
    //           </label>
    //           <input
    //             type="password"
    //             name="confirm-password"
    //             id="confirm-password"
    //             placeholder="••••••••"
    //             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //             onChange={(e) => setConfirmPassword(e.target.value)}
    //           />
    //         </div>
    //         <button
    //           type="submit"
    //           className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    //         >
    //           Restablecer Contrasena
    //         </button>
    //       </form>
    //     </div>
    //   </section>
    // </Modal>
  );
};

export default PasswordResetModal;
