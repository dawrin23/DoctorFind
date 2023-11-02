import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

export async function POST(request: Request) {
  //recibir email
  const { email } = await request.json();


  //validar que el email sea correcto
  if (!email) {
    return NextResponse.json(
      { message: "Email is incorrect" },
      { status: 400 }
    );
  }

  //validar si el email existe en la base de datos
  const userFound = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  //si el email no existe en la base de datos
  if (!userFound) {
    return NextResponse.json({ message: "User not found" }, { status: 409 });
  }

  const UserOtp = await prisma.otp.findUnique({
    where: {
      authorId: userFound.id,
    },
  })

  if(UserOtp){
    await prisma.otp.delete({
      where: {
        id: UserOtp.id
      }
    })
  }

  //generar otp y guardarlo en la base de datos
  const Otp = Math.floor(100000 + Math.random() * 900000);

  //guardar el otp en la base de datos
  const OtpUser = await prisma.otp.create({
    data: {
      otp: Otp,
      authorId: userFound.id,
    },
  });

  //enviar el otp al email del usuario
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Your OTP",
      react: EmailTemplate({ otp: Otp }),
      text: "", // Add this line to fix the error
    });
    return NextResponse.json({ message: "OTP sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "OTP not sent" }, { status: 400 });
  }
}
