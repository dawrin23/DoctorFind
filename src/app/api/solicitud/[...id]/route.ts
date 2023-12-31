import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
  params: {
    id: string[];
  };
}

export async function POST(request: Request, { params }: Params) {

  const userId = params.id[0];
  const doctorId = params.id[1];

  console.log(userId, doctorId);

  const {fecha, mensaje} = await request.json();

  const fechaISO = new Date(fecha).toISOString();


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
      fecha: fechaISO,
      mensaje: mensaje,
    },
    }
  );

  return NextResponse.json(solicitud);
}

export async function GET(request: Request, { params }: Params) {

  const doctorId = params.id[0];

  const solicitud = await prisma?.solicitud.findMany({
    where: {
      doctorId: Number(doctorId),
      aceptado: false,
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

export async function PUT(request: Request, { params }: Params) {


  const solicitudId = params.id[0];

  const solicitud = await prisma?.solicitud.update({
    where: {
      id: Number(solicitudId),
    },
    data: {
      aceptado: true,
    },
  });

  return NextResponse.json(solicitud);
}

export async function DELETE(request: Request, { params }: Params) { 
  
    const solicitudId = params.id[0];
  
    const solicitud = await prisma?.solicitud.delete({
      where: {
        id: Number(solicitudId),
      },
    });
  
    return NextResponse.json(solicitud);
}
