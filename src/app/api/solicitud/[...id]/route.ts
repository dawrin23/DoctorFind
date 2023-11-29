import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
  params: [string, string];
}

export async function POST(request: Request, { params }: Params) {
  //@ts-ignore
  const userId = params.id[0];
  //@ts-ignore
  const doctorId = params.id[1];

  console.log(userId, doctorId);

  //vreificar si el usuario ya tiene una solicitud con ese doctor
  const verificar = await prisma?.solicitud.findFirst({
    where: {
      authorId: Number(userId),
      doctorId: Number(doctorId),
    },
  });

  if (verificar) {
    return NextResponse.json(
      {
        message: "Ya tienes una solicitud con este doctor",
      },
      {
        status: 500,
      }
    );
  }

  const solicitud = await prisma?.solicitud.create({
    data: {
      author: {
        connect: {
          id: Number(userId),
        },
      },
      doctor: {
        connect: {
          id: Number(doctorId),
        },
      },
    },
    }
  );

  return NextResponse.json(solicitud);
}

export async function GET(request: Request, { params }: Params) {

  //@ts-ignore
  const doctorId = params.id[1];

  const solicitud = await prisma?.solicitud.findMany({
    where: {
      doctorId: Number(doctorId),
    },
    include: { 
      author: true,
    }
  })

  if(!solicitud){
    return NextResponse.json(
      {
        message: "No hay solicitudes",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(solicitud);
}
