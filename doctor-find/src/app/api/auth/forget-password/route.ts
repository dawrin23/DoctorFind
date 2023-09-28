import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/libs/prisma";
import { message } from "@/utils/message";
import jwt from "jsonwebtoken";

const resend = new Resend("re_MUociUpD_4e8miY57JL95aWqjvAgavg8R");

export async function POST(request: NextRequest) {
  try {
    const body: { email: string } = await request.json();
    const { email } = body;

    const userFind = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    //Validar que el usuario exista por el correo
    if (!userFind) {
      return NextResponse.json(
        { message: message.error.userNotFound },
        {
          status: 400,
        }
      );
    }

    const tokenData = {
      email,
      id: userFind.id,
    };

    const token = jwt.sign({ data: tokenData }, "secreto", {
      expiresIn: 86400,
    });

    const forgetUrl = `http://localhost:3000/auth/change-password?token=${token}`;

    // @ts-ignore
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Recuperar contraseña",
      html: `<a href="${forgetUrl}">Recuperar contraseña</a>`,
    });

    return NextResponse.json(
      { message: message.success.emailSend },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error al iniciar sesion", error },
      {
        status: 500,
      }
    );
  }
}
