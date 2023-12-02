import { Input, Textarea } from "@chakra-ui/react";
import { Dialog, Transition } from "@headlessui/react";
import { set } from "date-fns";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { toast, Toaster } from "sonner";

interface Doctor {
  id: number;
  email: string;
  name: string;
  lastname: string;
  password: string;
  foto: string;
  MedicalSpecialty: string;
  ContactPhone: string;
  WorkExperience: string;
  OfficeAddress: string;
  WorkingHours: string;
  Exequatur: string;
  createdAt: string;
  updatedAt: string;
}

function DoctorCard(doctor: Doctor) {
  const { data: session, status } = useSession();
  const userData = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [doctorId, setDoctorId] = useState(0);
  const [fecha, setFecha] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleCita = async (doctorId: number) => {
    const response = await fetch(
      //@ts-ignore
      `http://localhost:3000/api/solicitud/${userData?.id}/${doctorId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fecha: fecha,
          mensaje: mensaje,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      toast.success("Cita agendada con exito");
    }

    if (response.status === 500) {
      toast.error("Ya tienes una cita con este doctor");
    }
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-3 mr-3 mb-3 ">
      <div className="flex justify-end px-4 pt-4">
        <Toaster richColors />
      </div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={doctor.foto}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {doctor.name} {doctor.lastname}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {doctor.MedicalSpecialty}
        </span>
        <div className="flex mt-4 md:mt-6">
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setDoctorId(doctor.id);
            }}
            className="w-full inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Agendar cita
          </button>
        </div>
      </div>
      {/* <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>
      </div> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
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
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800 dark:border-gray-700">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Agendar Cita
                  </Dialog.Title>
                  <div className="mt-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Fecha de la cita
                    </label>
                    <Input
                      placeholder="Select Date and Time"
                      size="md"
                      type="datetime-local"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => {
                        setFecha(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Mensaje
                    </label>
                    <Textarea
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Here is a sample placeholder"
                      onChange={(e) => {
                        setMensaje(e.target.value);
                        console.log(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => handleCita(doctorId)}
                    >
                      Agendar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default DoctorCard;
