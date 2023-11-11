"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import Modal from "react-modal";
import PasswordResetModal from "@/components/PasswordResetModal";

function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const sendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    if (otp) {
      e.preventDefault();
      const data = await axios.post("http://localhost:3000/api/auth/find-otp", {
        otp: otp,
      });

      console.log(data)

      if (data.status === 200) {
        toast.success("Codigo correcto");
        //abrir modal para cambiar contraseña
        setModalIsOpen(true);
      }
    } else {
      toast.error("Ingrese un codigo");
    }
  };


  return (
    <div>
      <Toaster richColors />
      <h1>Restablecer contraseña</h1>
      <form onClick={sendOtp}>
        <input
          type="text"
          placeholder="Ingrese el codigo enviado a su correo"
          onChange={(event) => {
            setOtp(event.target.value);
          }}
        />
        <button type="submit">Enviar</button>
      </form>
     <PasswordResetModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
    </div>
  );
}

export default ResetPassword;
