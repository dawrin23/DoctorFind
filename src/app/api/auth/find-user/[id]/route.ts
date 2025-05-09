import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";


interface Params {
    params: { id: string };
  }
  

export async function POST(request: Request, { params }: Params) {
  const UserId = params.id;
  console.log(UserId);
  const UserIdNumber = Number(UserId);
    console.log(UserIdNumber);

  //buscar otp en la base de datos
  const userDB = await prisma.user.findUnique({
    where: {
      id: UserIdNumber,
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
        id: UserIdNumber,
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
