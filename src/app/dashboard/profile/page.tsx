"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

function ProfilePage() {
  const { data: session, status } = useSession();
  const userData = session?.user;

  return (

<div className="flex flex-col items-center pb-10 pt-5">
    {
      //@ts-ignore
        userData?.foto && (
            <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={userData?.foto}
            />
        )
    }
    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userData?.name} {userData?.lastname}</h5>
    <p>{userData?.email}</p>
    <h1>{userData?.id}</h1>
    <div className="flex mt-4 space-x-3 md:mt-6">
        
    <button
      className="btn btn-error hover:bg-red-500"
        onClick={() => {
          signOut();
        }}
      >
        Cerrar sesion
      </button>
    </div>
</div>

     
  
  );
}

export default ProfilePage;
