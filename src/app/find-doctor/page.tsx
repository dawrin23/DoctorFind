"use client";
import DoctorCard from "@/components/Doctor-card";
import doctorData from "@/data/doctor.json";
import { useState, useEffect } from "react";

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

function FindDoctor() {
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchQuery);
  };

  useEffect(() => {
    const fetchDoctor = async () => {
      const doctors = await fetch("http://localhost:3000/api/find-doctor", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await doctors.json();
      setDoctors(data.doctorFound);
    };
    fetchDoctor();
  }, []);


  useEffect(() => {
    const filterDoctors = (doctors: Doctor[]) => {
      return doctors.filter((doctor) => {
        return (
          doctor.MedicalSpecialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }
    setFilteredDoctors(filterDoctors(doctors));
  }, [searchQuery, doctors]);

  return (
    <div>
      <div className="mt-5 mb-5">
        <form onSubmit={handleSearch}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Busca tu doctor
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Busca Odontologos, Cirujanos..."
              required
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} {...doctor} />
        ))}
      </div>
    </div>
  );
}

export default FindDoctor;
