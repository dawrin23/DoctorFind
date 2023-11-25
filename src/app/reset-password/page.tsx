"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import PasswordResetModal from "@/components/PasswordResetModal";

function ResetPassword() {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOtpChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setOtp((prevOtp) => {
      const otpArray = [...prevOtp];
      otpArray[index] = value;
      return otpArray;
    });
  };

  const sendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Array.isArray(otp) && otp.length > 0) {
      const otpValue = otp.join("");
      console.log(otpValue);

      const res = await axios.post("http://localhost:3000/api/auth/find-otp", {
        otp: otpValue,
      });

      console.log(res);

      if (res.status === 200) {
        toast.success("Codigo correcto");
        //abrir modal para cambiar contraseña
        setModalIsOpen(true);
      }

       toast(res.data.message)

    } else {
      toast.error("Ingrese un codigo");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12 dark:bg-gray-900 ">
      <Toaster richColors />
      <div className="relative bg-white dark:bg-gray-800 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl dark:text-white">
              <p>Verificación de correo</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-black dark:text-white">
              <p>Hemos enviado un código a su correo</p>
            </div>
          </div>

          <div>
            <form onSubmit={sendOtp}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs ">
                  {[0, 1, 2, 3].map((_, index) => (
                    <div key={index} className="w-16 h-16 ">
                      <input
                        className="w-full h-full dark:text-black flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        placeholder="•"
                        maxLength={1}
                        onChange={(event) => {
                          handleOtpChange(index, event);
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    >
                      Verificar Codigo
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <PasswordResetModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
      {/* <Toaster richColors />
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
      </form> */}
    </div>
  );
}

export default ResetPassword;
