"use client";
import { FormEvent, useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const handledResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await fetch("http://localhost:3000/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (data.status === 200) {
      alert("Revisa tu correo electronico");
    }
  };

  return (
    <div>
      <h1>Restablecer Contraseña</h1>
      <form onSubmit={handledResetPassword}>
        <input
          type="email"
          placeholder="Correo Electronico"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
