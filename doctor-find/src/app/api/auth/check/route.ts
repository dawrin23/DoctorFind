import { message } from "@/utils/message";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const headersList = headers();
    const token = headersList.get("token");

    //validar que haya un token
    if (!token) {
      return NextResponse.json(
        { message: message.error.tokenNotValid },
        {
          status: 400,
        }
      );
    }

    try {
      const isTokenValid = jwt.verify(token, "secreto");
      //@ts-ignore
      const { data } = isTokenValid;

      const userFind = await prisma.user.findUnique({
        where: {
          id: data.id,
        },
      });

      //Validar que el usuario exista
      if (!userFind) {
        return NextResponse.json(
          { message: message.error.userNotFound },
          {
            status: 400,
          }
        );
      }

      return NextResponse.json(
        { isAuthorized: true, message: message.success.authorized },
        {
          status: 200,
        }
      );
    } catch (error) {
      return NextResponse.json(
        { message: message.error.tokenNotValid },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Algo ocurrio mal", error },
      {
        status: 400,
      }
    );
  }
}
