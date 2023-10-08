"use client";
import { useSession, signOut } from "next-auth/react";
import {Button} from "@mui/material";

function ProfilePage() {
  const { data: session, status } = useSession();

  console.log(session, status);

  return (
    <div>
      <h1>Profile</h1>
      <pre>
        {JSON.stringify(
          {
            session,
            status,
          },
          null,
          2
        )}
      </pre>
      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          signOut();
        }}
      >
        Cerrar sesion
      </Button>
    </div>
  );
}

export default ProfilePage;
