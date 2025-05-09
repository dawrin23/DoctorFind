import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import exp from "constants";

interface Params {
  params: {
    id: string[];
  };
}

export async function POST(request: Request, { params }: Params) {
  const userId = params.id;

  const solicitud = await prisma?.solicitud.findMany({
    where: {
      authorId: Number(userId),
      aceptado: true,
    },
    include: {
      doctor: true,
    }
  })

  return NextResponse.json(solicitud);
}

export async function GET(request: Request, { params }: Params) {

  const doctorId = params.id[0];

  const solicitud = await prisma?.solicitud.findMany({
    where: {
      doctorId: Number(doctorId),
      aceptado: true,
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


export async function DELETE(request: Request, { params }: Params) { 
  
    const solicitudId = params.id[0];
  
    const solicitud = await prisma?.solicitud.delete({
      where: {
        id: Number(solicitudId),
      },
    });
  
    return NextResponse.json(solicitud);
}
