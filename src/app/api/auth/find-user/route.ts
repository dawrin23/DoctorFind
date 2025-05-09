import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const UserId = await request.json();
  console.log(UserId.id);
  //convertir otp a number
  UserId.id = Number(UserId.id);
  console.log(UserId.id);

  //buscar otp en la base de datos
  const userDB = await prisma.user.findUnique({
    where: {
      id: UserId.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      foto: true,
    },
  });

  if (!userDB) {
    const UserDoctorDB = await prisma.userDoctor.findUnique({
      where: {
        id: UserId.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        foto: true,
        MedicalSpecialty: true,
        Exequatur: true,
      },
    });
    if (!UserDoctorDB) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json({
      message: "Usurio encontrado",
      user: UserDoctorDB,
    });
  }

  return NextResponse.json({
    message: "Usurio encontrado",
    user: userDB,
  });
}
