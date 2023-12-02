import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const otp = await request.json();
  //convertir otp a number
  otp.otp = Number(otp.otp);

  //buscar otp en la base de datos
  const otpDB = await prisma.otp.findUnique({
    where: {
      otp: otp.otp,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          foto: true,
        }
      },
    },
  });

  if (!otpDB) {
    return NextResponse.json(
      {
        message: "Otp not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(otpDB);
}
