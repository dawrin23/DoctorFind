import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { message } from "@/utils/message";
import { isValidEmail } from "@/utils/isValidEmail";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, apellido, email, password, confirmPassword } = body;
     console.log(body);

    //Validar que todos los campos esten llenos
    if (!email || !password || !confirmPassword || !nombre || !apellido) {
      return NextResponse.json(
        { message: message.error.needProps },
        {
          status: 400,
        }
      );
    }

    //Validar que el email sea valido
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: message.error.emailNotValid },
        {
          status: 400,
        }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "La contrasena deberia ser de minimo 6 caracteres" },
        {
          status: 400,
        }
      );
    }

    //validar que las contrasenas sean iguales
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Las contrasenas no coinciden" },
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

    if (userFind) {
      return NextResponse.json(
        { message: "El usuario ya existe" },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        nombre,
        apellido,
        email,
        password: hashedPassword,
      },
    });

    // @ts-ignore
    const { password: userPass, ...rest } = newUser;

    const token = jwt.sign({ data: rest }, "secreto", {
      expiresIn: 86400,
    });

    const response = NextResponse.json(
      {
        newUser: rest,
        message: "Usuario creado correctamente",
      },
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
      {
        message: "Error al crear el usuario",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
