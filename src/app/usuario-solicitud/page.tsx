"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

function SolicitudUsuario() {
  const [solicitudesAceptadas, setSolicitudesAceptadas] = useState([]);
  const { data: session, status } = useSession();
  const loading1 = status === "loading";
  const [id, setId] = useState(0);

  useEffect(() => {
    setId(session?.user?.id);
    console.log(session?.user?.id);
  }, [session]);

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
        "http://localhost:3000/api/solicitudesAceptadas/" + id.toString(),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setSolicitudesAceptadas(data);
      console.log(data);
    };
    Solicitudes();
  }, [solicitudesAceptadas]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-row">
        <div className=" m-3 justify-center w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Solicitudes Aceptadas Por el Doctor
            </h5>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              <li className="py-3 sm:py-4">
                {solicitudesAceptadas.map((solicitudAcepatadas: any) => (
                  <div
                    key={solicitudAcepatadas.id}
                    className="flex items-center mt-4"
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={solicitudAcepatadas.doctor.foto}
                        alt={solicitudAcepatadas.doctor.name}
                      />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {solicitudAcepatadas.doctor.name}
                      </p>
                      <p className="text-sm text-gray-500 text-justify dark:text-gray-400">
                        {solicitudAcepatadas.doctor.MedicalSpecialty}
                      </p>
                      <p className="text-sm text-gray-500 text-justify dark:text-gray-400">
                        {solicitudAcepatadas.mensaje}
                      </p>

                      <p className="text-sm text-gray-500 text-justify dark:text-white">
                        {new Date(solicitudAcepatadas.fecha).toLocaleString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                    <div className="m-3 flex flex-col font-semibold text-gray-900 dark:text-white">
                      <button
                        className="btn bg-blue-700 hover:bg-blue-900 text-white mb-1"
                        onClick={() => {
                          completado(solicitudAcepatadas.id);
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SolicitudUsuario;
