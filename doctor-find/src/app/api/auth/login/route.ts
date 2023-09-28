import { message } from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    //Validar que todos los campos esten llenos
    if (!email || !password) {
      return NextResponse.json(
        { message: message.error.needProps },
        {
          status: 400,
        }
      );
    }

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

    const passwordValid: boolean = await bcrypt.compare(
      password,
      userFind.password
    );

    //Validar que la contraseña sea valida
    if (!passwordValid) {
      return NextResponse.json(
        { message: message.error.passwordNotValid },
        {
          status: 400,
        }
      );
    }

    const { password: userPass, ...rest } = userFind;

    const token = jwt.sign({ data: rest }, "secreto", { expiresIn: 86400 });

    const response = NextResponse.json(
      { userLogged: rest, message: message.success.userLogged },
      {
        status: 200,
      }
    );

    response.cookies.set("auth_cookie", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error al iniciar sesion", error },
      {
        status: 500,
      }
    );
  }
}
