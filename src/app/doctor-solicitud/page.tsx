"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

function DoctorSolicitud() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [solicitudesAceptadas, setSolicitudesAceptadas] = useState([]);
  const { data: session, status } = useSession();
  const loading1 = status === "loading";
  const [doctorId, setDoctorId] = useState(0);

  useEffect(() => {
    setDoctorId(session?.user?.id)
  }, [session]);

  const acceptarSolicitud = async (solicitudId: number) => {
    const res = await axios.put(
      "http://localhost:3000/api/solicitud/" + solicitudId
    );
    const data = await res.data;
    console.log(data);
  };

  const rechasarSolicitud = async (solicitudId: number) => {
    const res = await axios.delete(
      "http://localhost:3000/api/solicitud/" + solicitudId
    );
    const data = await res.data;
    console.log(data);
  };

  const completado = async (solicitudId: number) => {
    const res = await axios.delete(
      "http://localhost:3000/api/solicitudesAceptadas/" + solicitudId
    );
    const data = await res.data;
    console.log(data);
  };

  useEffect(() => {
    const Solicitudes = async () => {
      const res = await fetch(
        "http://localhost:3000/api/solicitud/" + doctorId.toString(),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setSolicitudes(data);
      console.log(data);
    };
    Solicitudes();

    const solicitudesAcepatadas = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/solicitudesAceptadas/" + doctorId
      );
      const data = await res.data;
      setSolicitudesAceptadas(data);
    };
    solicitudesAcepatadas();
  }, [solicitudes]);

  return (
    <div className="flex flex-row-reverse justify-center">
      <div className=" m-3 justify-center w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Solicitudes Aceptadas
          </h5>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            <li className="py-3 sm:py-4">
              {solicitudesAceptadas.map((solicitudAcepatadas: any) => (
                <div key={solicitudAcepatadas.id} className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={solicitudAcepatadas.author.foto}
                      alt={solicitudAcepatadas.author.name}
                    />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {solicitudAcepatadas.author.name}
                    </p>
                    <p className="text-sm text-gray-500 text-justify dark:text-gray-400">
                      {solicitudAcepatadas.mensaje}
                    </p>

                    <p className="text-sm text-gray-500 text-justify dark:text-white">
                      {new Date(solicitudAcepatadas.fecha).toLocaleString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="m-3 flex flex-col font-semibold text-gray-900 dark:text-white">
                    <button
                      className="btn bg-blue-700 hover:bg-blue-900 text-white mb-1"
                      onClick={() => {
                        completado(solicitudAcepatadas.id);
                      }}
                    >
                      Completado
                    </button>
                  </div>
                </div>
              ))}
            </li>
          </ul>
        </div>
      </div>
      <div className=" m-3 justify-center w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Solicitudes Pendientes
          </h5>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            <li className="py-3 sm:py-4">
              {solicitudes.map((solicitud) => (
                <div key={solicitud.id} className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={solicitud.author.foto}
                      alt={solicitud.author.name}
                    />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {solicitud.author.name} {solicitud.author.lastname}
                    </p>
                    <p className="text-sm text-gray-500 text-justify dark:text-gray-400">
                      {solicitud.mensaje}
                    </p>

                    <p className="text-sm text-gray-500 text-justify dark:text-white">
                      {new Date(solicitud.fecha).toLocaleString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="m-3 flex flex-col font-semibold text-gray-900 dark:text-white">
                    <button
                      className="btn bg-blue-700 hover:bg-blue-900 text-white mb-1"
                      onClick={() => {
                        acceptarSolicitud(solicitud.id);
                      }}
                    >
                      Acceptar
                    </button>
                    <button
                      className="btn bg-red-700 hover:bg-red-900 text-white"
                      onClick={() => {
                        rechasarSolicitud(solicitud.id);
                      }}
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DoctorSolicitud;
