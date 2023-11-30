import { useSession } from "next-auth/react";
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

  const handleCita = async (doctorId: number) => {
    const response = await fetch(
      //@ts-ignore
      `http://localhost:3000/api/solicitud/${userData?.id}/${doctorId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-3 mr-3 mb-3 ">
      <div className="flex justify-end px-4 pt-4">
        <Toaster richColors />
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
        {/*<!-- Dropdown menu --> */}
        <div
          id="dropdown"
          className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Export Data
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
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
              handleCita(doctor.id);
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Agendar cita
          </button>
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
          >
            Mensaje
          </a>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
