"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

function ProfilePage() {
  const { data: session, status } = useSession();

  console.log(session, status);
  const userData = session?.user;

  return (
    <div>
      <h1>Profile</h1>
      {/* <pre>
        {JSON.stringify(
          {
            session,
            status,
          },
          null,
          2
        )}
      </pre> */}
      <div className="container flex-col justify-items-center ">
        <h2>Nombre: {userData?.name} {userData?.lastname}</h2>
        <h2>Email: {userData?.email}</h2>
        <div className="avatar">
  <div className="w-24 rounded-full">
    {
      //@ts-ignore
      userData?.foto ? (  <img src={userData?.foto} />) : (<Image src="/avatar.png" width={100} height={100} alt="nothin" />)
    }
   
  </div>
</div>
      </div>
      <button
      className="btn btn-error hover:bg-red-500"
        onClick={() => {
          signOut();
        }}
      >
        Cerrar sesion
      </button>
    </div>
  );
}

export default ProfilePage;
